from random import choice

debug = False

# Constants
choices = ["A", "Z"]
random_guesses = 4


# Define or reset global variables
def reset():
    global inputs, d, i, j, n
    # Liste des entrées de l'utilisateur
    inputs = []
    # Dictionnaire avec :
    # - clés : couples (n1, n2), où n1 et n2 sont les longueurs des deux dernières séquences de lettres identiques
    # - valeurs : positive si après deux séquences de taille n1 et n2, il est plus fréquent que la lettre change, négative sinon
    d = {}
    # Index de l'avant-dernier changement de lettre
    i = 0
    # Index du dernier changement de lettre
    j = 0
    # Index de la dernière lettre
    n = 0


reset()


def input(new):
    global i, j, n

    inputs.append(new)
    if debug:
        print("Inputs: {}".format(inputs))

    if j > 0:
        key = (j - i, n - j)
        eq = 1 if inputs[-1] == inputs[-2] else -1
        if key not in d:
            d[key] = eq
        else:
            d[key] += eq
        if debug:
            print(
                "Après {}, {}".format(key, "même lettre" if eq == 1 else "changement")
            )

    if n > 0 and inputs[-1] != inputs[-2]:
        i = j
        j = n

    n += 1

    if debug:
        print(d)


def predict():
    if len(inputs) < random_guesses:
        # Les premières prédictions sont aléatoires
        return choice(choices)
    elif j > 0:
        key = (j - i, n - j)
        if key in d:
            eq = d[key]
            if debug:
                print(
                    "Pour {}, le plus souvent {} ({})".format(
                        key, "même lettre" if eq >= 0 else "changement", eq
                    )
                )
            if eq >= 0:
                return inputs[-1]
            else:
                return choices[1] if inputs[-1] == choices[0] else choices[0]
        else:
            # Sinon, la prédiction correspond à la dernière entrée de l'utilisateur
            return inputs[-1]
    else:
        # Là aussi, la prédiction correspond à la dernière entrée de l'utilisateur
        return inputs[-1]
