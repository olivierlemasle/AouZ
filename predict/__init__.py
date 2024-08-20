from random import choice

from predict.Module1 import Module1
from predict.Module2 import Module2

debug = False


# Create global variables
modules = []
inputs = []
predictions = []


def reset():
    global modules, inputs, predictions
    modules = [Module1(), Module2()]
    inputs = []
    predictions = []


reset()


def predict():
    if debug:
        for mod in modules:
            name = type(mod).__name__
            prediction = mod.predict(inputs, predictions)
            print("Prediction {}: {}".format(name, prediction))

    total = sum(mod.predict(inputs, predictions) for mod in modules)

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
        mod.input(inputs, predictions)
        mod.update_fitness(inputs, predictions)

    if debug:
        for mod in modules:
            print("{}: {}".format(type(mod).__name__, mod))
