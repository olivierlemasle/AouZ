class Module2:
    fitness = 1

    count_success = 0
    count_failure = 0

    def predict(self, inputs, predictions):
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

    def input(self, inputs, predictions):
        last_input = inputs[-1]
        last_prediction = predictions[-1]
        if last_input == last_prediction:
            self.count_success += 1
        else:
            self.count_failure += 1

    def update_fitness(self, inputs, predictions):
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
        return "Fitness: {}  Successes: {}  Failures: {}".format(
            self.fitness, self.count_success, self.count_failure
        )
