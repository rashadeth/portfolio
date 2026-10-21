"""Build a reusable LUT for the portfolio's sculpted hero video."""
from pathlib import Path
# A single olive hue family: deep creases through soft olive highlights.
stops = [(0.0, (17,23,13)), (.18,(27,35,19)), (.32,(37,47,25)),
         (.48,(48,60,32)), (.60,(59,72,39)), (.74,(75,88,48)),
         (.88,(96,108,62)), (1.0,(136,146,100))]
def color(t):
    for (a, ca), (b, cb) in zip(stops, stops[1:]):
        if t <= b:
            k=max(0,(t-a)/(b-a))
            return [(u+(v-u)*k)/255 for u,v in zip(ca,cb)]
    return [v/255 for v in stops[-1][1]]
size=33
out=['TITLE "Ian O tonal olive sculpted palette"',f'LUT_3D_SIZE {size}','DOMAIN_MIN 0 0 0','DOMAIN_MAX 1 1 1']
for b in range(size):
 for g in range(size):
  for r in range(size):
   lum=(.2126*r+.7152*g+.0722*b)/(size-1)
   t=min(1,max(0,(lum-.04)/.78))
   out.append(' '.join(f'{v:.6f}' for v in color(t)))
Path('/tmp/portfolio-brand.cube').write_text('\n'.join(out)+'\n')
