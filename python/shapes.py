from p5 import *


class Row:
    def __init__(self, y_pos=1, x_positions=[1, 2], grid_width=10, color=255):
        self.y_pos = y_pos
        self.x_positions = x_positions
        self.grid_width = grid_width
        self.color = color
        self.circles = [
            Circle(p, self.y_pos * self.grid_width, color=self.color)
            for p in self.x_positions
        ]

    def draw(self):
        for circle in self.circles:
            circle.draw()

    def get_circles(self):
        return self.circles


class Circle:
    # a circle just contains its x, y position, colour and radius.
    def __init__(self, x, y, radius=7, color=50):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color

    def is_clicked(self, x, y):
        distance = sqrt((x - self.x) ** 2 + (y - self.y) ** 2)
        return distance <= self.radius

    def change_color(self, color):
        self.color = color

    def draw(self):
        # Unpack the color tuple here
        if isinstance(self.color, tuple):
            fill(*self.color)
        else:
            fill(self.color)
        circle((self.x, self.y), self.radius)
