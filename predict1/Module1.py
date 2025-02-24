class Module1:
    """This module counts occurrences of A and Z."""

    fitness = 1

    count_a = 0
    count_z = 0

    def predict(self, inputs, predictions):
        if self.count_a == self.count_z:
            pred = 0
        elif self.count_a > self.count_z:
            pred = self.count_a / max(self.count_z, 1)
        else:
            pred = -1 * self.count_z / max(self.count_a, 1)
        return self.fitness * pred

    def input(self, inputs, predictions):
        if inputs[-1] == "A":
            self.count_a += 1
        elif inputs[-1] == "Z":
            self.count_z += 1
        else:
            raise ValueError("Illegal value")

    def update_fitness(self, inputs, predictions):
        more_a = self.count_a > self.count_z
        new_input_is_a = inputs[-1] == "A"
        positive_fitness = self.fitness > 0

        if (more_a and new_input_is_a) or (not more_a and not new_input_is_a):
            if positive_fitness:
                self.fitness *= 4 / 3
            else:
                self.fitness = 1
        elif (more_a and not new_input_is_a) or (not more_a and new_input_is_a):
            if positive_fitness:
                self.fitness = -1
            else:
                self.fitness *= 4 / 3

    def __str__(self) -> str:
        return "Fitness: {}  A: {}  Z: {}".format(
            self.fitness, self.count_a, self.count_z
        )
