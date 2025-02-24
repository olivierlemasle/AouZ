#!/usr/bin/env python3

import argparse
import importlib
import signal
import sys


def signal_handler(signum, frame):
    print("\nFin")
    sys.exit(0)


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
    else:
        raise ValueError("Entrée invalide")


def main():
    signal.signal(signal.SIGINT, signal_handler)

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--debug", help="Active les informations de débogage", action="store_true"
    )
    parser.add_argument(
        "--module", help="Name of the Python module to use", default="predict1"
    )
    args = parser.parse_args()
    debug = args.debug
    module = args.module

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
            print("\nFin")
            break

        prediction = predict.predict()
        print(prediction)
        predict.input(i)


if __name__ == "__main__":
    main()
