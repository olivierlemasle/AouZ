#!/usr/bin/env python3

import argparse
import importlib
import signal
import sys

try_counts = 0
success_counts = 0


def signal_handler(signum, frame):
    end()
    sys.exit(0)


def end():
    print("\n")
    print(score())


def score():
    return (
        "Succès : {} / {} ({:.2%})".format(
            success_counts, try_counts, success_counts / try_counts
        )
        if try_counts > 0
        else "Pas encore de résultat"
    )


def parse_input(s):
    # Enlève les espaces en début et fin de la chaine de caractères
    s = s.strip()
    # Passe en lettres minuscules
    s = s.lower()
    if s == "0" or s == "a":
        return "A"
    elif s == "1" or s == "z":
        return "Z"
    elif s == "t" or s == "d":
        predict.debug = not predict.debug
        raise ValueError("Debug={}".format(predict.debug))
    elif s == "s":
        raise ValueError(score())
    else:
        raise ValueError("Entrée invalide")


def main():
    signal.signal(signal.SIGINT, signal_handler)

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--debug", help="Active les informations de débogage", action="store_true"
    )
    parser.add_argument(
        "--module", help="Name of the Python module to use", default="predict2"
    )
    parser.add_argument("--show-progress", action="store_true")
    args = parser.parse_args()
    debug = args.debug
    module = args.module
    show_progress = args.show_progress

    if debug:
        print("Module name: {}".format(module))
    global predict
    predict = importlib.import_module(module)
    predict.debug = debug

    print("A ou Z ?")

    while True:
        try:
            s = input(">> ")
            i = parse_input(s)
        except ValueError as e:
            print(e)
            continue
        except EOFError:
            end()
            break

        prediction = predict.predict()
        print(prediction)
        predict.input(i)

        global try_counts, success_counts
        try_counts += 1
        if i == prediction:
            success_counts += 1
        if show_progress:
            print(score())


if __name__ == "__main__":
    main()
