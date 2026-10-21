"""Build a reusable LUT for the portfolio's sculpted hero video."""
from pathlib import Path
# Reference palette: espresso, olive, burnt orange, mustard, cream.
stops = [(0.0, (36,25,21)), (.18,(63,40,21)), (.32,(83,68,28)),
         (.48,(157,48,17)), (.60,(197,61,16)), (.74,(207,111,45)),
         (.88,(214,163,89)), (1.0,(248,235,216))]
def color(t):
    for (a, ca), (b, cb) in zip(stops, stops[1:]):
        if t <= b:
            k=max(0,(t-a)/(b-a))
            return [(u+(v-u)*k)/255 for u,v in zip(ca,cb)]
    return [v/255 for v in stops[-1][1]]
size=33
out=['TITLE "Ian O warm sculpted brand palette"',f'LUT_3D_SIZE {size}','DOMAIN_MIN 0 0 0','DOMAIN_MAX 1 1 1']
for b in range(size):
 for g in range(size):
  for r in range(size):
   lum=(.2126*r+.7152*g+.0722*b)/(size-1)
   t=min(1,max(0,(lum-.04)/.78))
   out.append(' '.join(f'{v:.6f}' for v in color(t)))
Path('/tmp/portfolio-brand.cube').write_text('\n'.join(out)+'\n')
