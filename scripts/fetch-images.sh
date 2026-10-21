#!/usr/bin/env bash
# Downloads the OpenArt-generated images into assets/img/.
# Run from the repo root: bash scripts/fetch-images.sh
set -euo pipefail
B=https://cdn.openart.ai/openart-ai/production/2026-10/create-image/srkMtfcGJdUPRjao76Ue
mkdir -p assets/img
while read -r name file; do
  curl -sSfL -o "assets/img/$name.png" "$B/$file"
  echo "ok  $name"
done <<'LIST'
hero image_1792615759078_7e8b641d_1792615760008_1cb04400.png
salt-and-cedar image_1792615752557_bed0e348_1792615752622_bfacf99f.png
the-quiet-hours image_1792615752889_f2629bff_1792615752962_bd4e1969.png
north-shore image_1792615755350_2230cf6d_1792615755436_f98e5538.png
paper-moon image_1792615757301_b163e9c2_1792615757368_2878b403.png
glass-houses image_1792615760044_795d41b7_1792615760096_03671f63.png
afterlight image_1792615760204_f333a188_1792615760368_ed79aa8e.png
low-tide image_1792615762799_e4c482dd_1792615762927_12009ee4.png
the-understudy image_1792615785015_34623e1e_1792615785143_672b2426.png
commercial-drive image_1792615765826_db9c4f15_1792615766297_9ac6131e.png
winter-garden image_1792615770485_e31a8d23_1792615770697_3a45a938.png
rain-city-monologues image_1792615768188_06a52a78_1792615768357_f4030f0b.png
dead-air image_1792615785784_3698e669_1792615785847_63b2ddfa.png
people-mara image_1792615770000_7a85dbb7_1792615770117_6fce506e.png
people-jordan image_1792615771365_64647d49_1792615771417_f4c25244.png
people-theo image_1792615773204_292b6c34_1792615773411_73e01d70.png
people-ana image_1792615774914_e136f3f3_1792615774980_0155c702.png
contact image_1792615775512_e95c9fc8_1792615775550_ec5c9337.png
LIST

# Convert to compressed JPG (the site loads assets/img/<name>.jpg)
python3 - <<'PY'
import glob, os
from PIL import Image
for p in glob.glob("assets/img/*.png"):
    im = Image.open(p).convert("RGB")
    im.thumbnail((2400, 2400) if p.endswith("hero.png") else (1000, 1000))
    im.save(p[:-4] + ".jpg", quality=82, optimize=True, progressive=True)
    os.remove(p)
PY
