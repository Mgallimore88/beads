from shapes import Row


class RowManager:
    def __init__(self, current_width=1, grid_width=10, offset=10):
        self.current_row = 1
        self.grid_width = grid_width
        self.offset = offset
        self.current_width = current_width
        self.positions = self.calculate_x_positions()
        self.rows = [Row(self.current_row, self.positions)]

    def calculate_x_positions(self):
        positions = list(range(self.current_width))
        positions = [self.offset + p - self.current_width / 2 for p in positions]
        positions = [p * self.grid_width + self.offset for p in positions]
        return positions

    def add_row(self):
        xpos = self.calculate_x_positions()
        self.current_row += 1
        self.rows.append(Row(self.current_row, xpos))

    def remove_row(self):
        self.current_row -= 1
        self.rows.pop()

    def next_row(self, color):
        xpos = self.calculate_x_positions()
        return Row(self.current_row + 1, xpos, color=color)

    def get_all_circles(self):
        all_circles = []
        for row in self.rows:
            all_circles.extend(row.get_circles())
        return all_circles
