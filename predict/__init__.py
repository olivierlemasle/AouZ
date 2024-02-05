from random import choice

debug = False


class Module1:
    fitness = 1

    count_a = 0
    count_z = 0

    def predict(self):
        if self.count_a == self.count_z:
            pred = 0
        elif self.count_a > self.count_z:
            pred = self.count_a / max(self.count_z, 1)
        else:
            pred = -1 * self.count_z / max(self.count_a, 1)
        return self.fitness * pred

    def input(self):
        if inputs[-1] == "A":
            self.count_a += 1
        elif inputs[-1] == "Z":
            self.count_z += 1
        else:
            raise ValueError("Illegal value")

    def update_fitness(self):
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
        return "Prediction: {}  Fitness: {}  A: {}  Z: {}".format(
            self.predict(), self.fitness, self.count_a, self.count_z
        )


class Module2:
    fitness = 1

    count_success = 0
    count_failure = 0

    def predict(self):
        if self.count_success == self.count_failure:
            pred = 0
        elif self.count_success > self.count_failure:
            pred = self.count_success / max(self.count_failure, 1)
        else:
            pred = self.count_failure / max(self.count_success, 1)
        if len(predictions) > 0:
            lastPrediction = 1 if predictions[-1] == "A" else -1
        else:
            lastPrediction = 0
        return self.fitness * pred * lastPrediction

    def input(self):
        last_input = inputs[-1]
        last_prediction = predictions[-1]
        if last_input == last_prediction:
            self.count_success += 1
        else:
            self.count_failure += 1

    def update_fitness(self):
        more_successes = self.count_success > self.count_failure
        new_input_is_success = inputs[-1] == predictions[-1]
        positive_fitness = self.fitness > 0

        if (more_successes and new_input_is_success) or (
            not more_successes and not new_input_is_success
        ):
            if positive_fitness:
                self.fitness *= 4 / 3
            else:
                self.fitness = 1
        elif (more_successes and not new_input_is_success) or (
            not more_successes and new_input_is_success
        ):
            if positive_fitness:
                self.fitness = -1
            else:
                self.fitness *= 4 / 3

    def __str__(self) -> str:
        return "Prediction: {}  Fitness: {}  Successes: {}  Failures: {}".format(
            self.predict(), self.fitness, self.count_success, self.count_failure
        )


modules = [Module1(), Module2()]
inputs = []
predictions = []


def predict():
    if debug:
        for mod in modules:
            print("{} - {}".format(type(mod).__name__, mod.predict()))

    total = sum(mod.predict() for mod in modules)

    # Je ne veux pas avoir de prédiction "neutre"
    if total == 0:
        total = choice([-1, 1])

    prediction = "A" if total > 0 else "Z"
    if debug:
        print("Prediction: {}  ({})".format(prediction, total))

    predictions.append(prediction)
    return prediction


def input(i):
    inputs.append(i)

    for mod in modules:
        mod.input()
        mod.update_fitness()

    if debug:
        for mod in modules:
            print("{}: {}".format(type(mod).__name__, mod))
