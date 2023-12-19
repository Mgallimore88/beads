from p5 import *
from shapes import Row, Circle
from row_manager import RowManager
from color_picker import ColorPicker

width = 500
height = 500
grid_width = 10


def setup():
    global color
    size(width, height)
    global row_manager
    row_manager = RowManager(offset=23)
    color = ColorPicker()


def draw():
    for row in row_manager.rows:
        row.draw()
    row_manager.next_row(color=color.current_color).draw()
    background(50)


def key_pressed(event):
    global row_manager
    global color
    print(event.key)
    if event.key == "DOWN":
        print("down")
        row_manager.add_row()
    if event.key == "UP":
        print("up")
        row_manager.remove_row()
    if event.key == "LEFT":
        print("left")
        row_manager.current_width -= 1
    if event.key == "RIGHT":
        print("right")
        row_manager.current_width += 1
    if event.key == " ":
        color.next()
        print(color.get_current_color())
    if event.key == "z":
        color.prev()
        print(color.get_current_color())

    if event.key in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]:
        print(event.key)
        color.add(str(event.key))


def mouse_pressed(event):
    rgb = color.get_current_color()
    global row_manager
    x, y = event.x, event.y
    for circle in row_manager.get_all_circles():
        if circle.is_clicked(x, y):
            circle.change_color((rgb))


if __name__ == "__main__":
    run()
