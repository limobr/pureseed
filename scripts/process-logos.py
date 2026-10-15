"""Builds web logo assets in public/images from the original brand files.
Usage: python3 scripts/process-logos.py <full.png> <mark.png> <tagline.png>"""
import sys
import numpy as np
from PIL import Image, ImageDraw

full_f, mark_f, tag_f = sys.argv[1:4]
O = "public/images/"

def load(path):
    im = Image.open(path).convert("RGBA")           # flatten any transparency onto white
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255)); bg.alpha_composite(im)
    return bg.convert("RGB")

def to_alpha(im):                                    # white background -> transparent, soft edges kept
    a = np.asarray(im).astype(float); mn = a.min(axis=2)
    alpha = np.clip((250 - mn) / (250 - 70), 0, 1)
    safe = np.where(alpha > 0.01, alpha, 1)[..., None]
    out = np.zeros(a.shape[:2] + (4,))
    out[..., :3] = np.clip(255 - (255 - a) / safe, 0, 255); out[..., 3] = alpha * 255
    return Image.fromarray(out.astype("uint8"), "RGBA")

def trim(im, pad=0.04):
    bbox = im.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
    im = im.crop(bbox); p = int(max(im.size) * pad)
    c = Image.new("RGBA", (im.width + 2 * p, im.height + 2 * p), (0, 0, 0, 0)); c.paste(im, (p, p)); return c

def light(im):                                       # green ink -> white, gold dot kept (for dark footer)
    a = np.asarray(im).copy(); a[~(a[..., 0] > a[..., 1]), 0:3] = 255
    return Image.fromarray(a, "RGBA")

def fit_w(im, w): return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)

full = trim(to_alpha(load(full_f))); tag = trim(to_alpha(load(tag_f))); mark = trim(to_alpha(load(mark_f)), 0.06)
fit_w(full, 900).save(O + "logo.png", optimize=True)
fit_w(light(full), 900).save(O + "logo-light.png", optimize=True)
fit_w(tag, 1000).save(O + "logo-tagline.png", optimize=True)
fit_w(mark, 500).save(O + "logo-mark.png", optimize=True)

S = 512; fav = Image.new("RGBA", (S, S), (0, 0, 0, 0))
ImageDraw.Draw(fav).rounded_rectangle([0, 0, S - 1, S - 1], radius=96, fill=(255, 255, 255, 255))
m = mark.copy(); m.thumbnail((380, 380), Image.LANCZOS); fav.paste(m, ((S - m.width) // 2, (S - m.height) // 2), m)
fav.save(O + "favicon.png", optimize=True)

og = Image.new("RGB", (1200, 630), (238, 242, 236)); t = tag.copy(); t.thumbnail((980, 420), Image.LANCZOS)
og.paste(t, ((1200 - t.width) // 2, (630 - t.height) // 2), t); og.save(O + "og-default.jpg", quality=88, optimize=True)
print("logo size", fit_w(full, 900).size)
