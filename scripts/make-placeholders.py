"""Creates labelled placeholder images in public/images for any file that does not exist yet.
Real images you add with the same filename are never overwritten."""
import os, json, hashlib
from PIL import Image, ImageDraw
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
sizes = {
 "hero.jpg":(1600,1200),
 "sesame-seeds.png":(1000,1000),"sesame-oil.png":(1000,1000),"cashew-nuts.png":(1000,1000),"groundnuts.png":(1000,1000),"organic-honey.png":(1000,1000),
 "sesame-seeds-field.jpg":(1600,700),"sesame-oil-pressing.jpg":(1600,700),"cashew-nuts-processing.jpg":(1600,700),"groundnuts-harvest.jpg":(1600,700),"organic-honey-apiary.jpg":(1600,700),
}
for n in ["sourcing","bulk","processing","quality","packaging","private-label","export"]:
    sizes[f"service-{n}.jpg"]=(1600,800)
for n in ["sourcing-origin","bulk-warehouse","processing-grading","quality-lab","packaging-bulk","private-label-packs","export-port"]:
    sizes[f"service-{n}.jpg"]=(900,630)
os.makedirs(OUT, exist_ok=True)
REG=os.path.join(OUT,".placeholders.json")
reg=json.load(open(REG)) if os.path.exists(REG) else {}
for name,(w,h) in sizes.items():
    path=os.path.join(OUT,name)
    if os.path.exists(path): continue
    cutout = name.endswith(".png") and "service" not in name and True
    img=Image.new("RGBA" if cutout else "RGB",(w,h),(0,0,0,0) if cutout else (222,230,220))
    d=ImageDraw.Draw(img)
    if cutout: d.ellipse([w*.2,h*.2,w*.8,h*.8],fill=(222,230,220,255))
    d.text((w*.5,h*.5),f"PLACEHOLDER\n{name}\n{w}x{h}",fill=(29,64,48),anchor="mm",align="center",font_size=max(18,w//28))
    img.save(path)
    reg[name]=hashlib.sha256(open(path,"rb").read()).hexdigest()
json.dump(reg,open(REG,"w"),indent=1)
