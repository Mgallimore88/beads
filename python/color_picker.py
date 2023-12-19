class ColorPicker:
    def __init__(self):
        self.idx = 0
        self.rgb_pallette = [
            (255, 0, 0),
            (0, 255, 0),
            (0, 0, 255),
            (255, 255, 0),
            (0, 255, 255),
            (255, 0, 255),
            (255, 255, 255),
            (0, 0, 0),
        ]
        self.current_color = self.rgb_pallette[self.idx]

        self.color_dict = {}

    def add_color(self, color):
        self.rgb_pallette.append(color)

    def next(self):
        self.idx += 1
        print(self.idx)
        if self.idx >= len(self.rgb_pallette):
            self.idx = 0
        self.current_color = self.rgb_pallette[self.idx]

    def prev(self):
        self.idx -= 1

        if self.idx < 0:
            self.idx = len(self.rgb_pallette) - 1
        self.current_color = self.rgb_pallette[self.idx]

    def get_current_color(self):
        return self.current_color

    def add(self, key):
        if key in self.color_dict:
            self.current_color = self.color_dict[key]
        else:
            self.color_dict[key] = self.current_color
