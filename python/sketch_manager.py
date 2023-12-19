from p5 import size, background


class SketchManager:
    def __init__(self):
        x = 1
        # self.picture = YourPictureClass()  # Replace with your actual class
        # self.board = YourBoardClass()      # Replace with your actual class

    def setup(self):
        self.picture.create_canvas()
        self.picture.make_tiles()
        background(100)

    def draw(self):
        self.picture.draw(self.board.cells)

    def key_pressed(self, event):
        pass
