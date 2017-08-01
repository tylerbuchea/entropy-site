# 198x329
# 198x598
# 240x428
# 367x429
# 488x235

# 1: 12 / 01 / 24 / 05 : 07 : (4 / 12)
# 2: 14 / 05 / 28 / 10 : 11 : (5 / 14)
# 3: 01 / 10 / 26 / 15 : 15 : (5 / 25)
# 4: 11 / 15 / 29 / 24 : 17 : (9 / 18)
# 5: 01 / 15 / 11 / 27 : 21 : (12 / 26)
# 6: 11 / 24 / 20	/ 30 : 06 : (6 / 19)

# This is for generating cropping out standard sizes to go into the site grid

echo "Enter image location: "
read img_locaction

convert $img_locaction -gravity center -crop 198x329+0+0 out0.png
convert $img_locaction -gravity center -crop 198x598+0+0 out1.png
convert $img_locaction -gravity center -crop 240x428+0+0 out2.png
convert $img_locaction -gravity center -crop 367x429+0+0 out3.png
convert $img_locaction -gravity center -crop 488x235+0+0 out4.png

# -colorspace Gray

# convert $img_locaction -crop 640x480+50+100 ./out.png
# convert $img_locaction -resize 200x100 out.png
