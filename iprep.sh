# 198x329
# 198x598
# 240x428
# 367x429
# 488x235

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
