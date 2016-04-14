G21 G98
G28 U0 W0
M06 T4
M03 S1000
G00 X1 Z5 (Go to initial position before cutting)
N1 G90 X2 Z-15 F1000
        X3
        X4
        X5
        X6
        X7
        X8
        X9
        X10
        X11
N2 G90 X12 Z-15 F1000
        X13
        X14
        X15
N3 G90 X15 Z-10 F1000
        X16
        X17
        X18
        X19
        X20
G28 U0 W0
M05
M30