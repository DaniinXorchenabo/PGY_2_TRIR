from os.path import isfile, split, join, exists
from os import mkdir
from time import sleep
from PIL import Image


def crop_img(img, dx, dy):
    if isfile(img):
        image = Image.open(img)
        w, h = image.size
        *img_name, file_type = split(img)[1].split('.')
        img_name = '.'.join(img_name)
        if not exists(img_name):  # Создаем папку
            mkdir(img_name)
        img_name = join(split(__file__)[0], img_name, img_name)
        file_type = "." + file_type
        for st_x in range(0, w, dx):
            for st_y in range(0, h, dy):
                t = image.crop((st_x, st_y, dx + st_x, dy + st_y))
                # print(st_x, st_y, img_name + f"_{st_x//dx}_{st_y//dy}" + file_type, t.size)
                t.save(img_name + f"_{st_x//dx}_{st_y//dy}" + file_type)

    else:
        print('изображение', img, "не найдено")
        sleep(5)
        exit()

crop_img("background1.png", 67, 67)