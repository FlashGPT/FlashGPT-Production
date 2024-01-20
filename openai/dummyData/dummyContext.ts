export const dummyContext: string = `
1.1 WHAT IS A LINEAR TRANSFORMATION?
You know what a function is - it’s a RULE which turns NUMBERS INTO OTHER NUM-
BERS: f(x) = x2 means “please turn 3 into 9, 12 into 144 and so on”. 2
Similarly a TRANSFORMATION is a rule which turns VECTORS into other VECTORS.
For example, “please rotate all 3-dimensional vectors through an angle of 90◦ clockwise
around the z-axis”. A LINEAR TRANSFORMATION T is one that ALSO satisfies these ⇀⇀
rules: if c is any scalar, and u and v are vectors, then
⇀⇀⇀⇀⇀⇀
T(cu)=cT(u) and T(u+v)=T(u)+T(v).
It is called a LINEAR transformation because it maps straight lines to straight lines.
⇀⇀
Recall that a straight line is a mapping that sends a real scalar t to the vector u + t v , ⇀⇀
where u and v are given vectors. When we let a linear transformation T act on this, we ⇀⇀
get (by the above rules) T u + t T v . But this is just another straight line. REMEMBER THIS: a linear transformation is a mapping that has a definite GEOMETRIC meaning: it turns straight lines into other straight lines! So in a sense, linear algebra is a branch of geometry!
⇀⇀⇀
EXAMPLE: Let I be the rule Iu = u for all u. You can check that I is linear! Called IDENTITY Linear Transformation.
⇀⇀⇀
EXAMPLE : Let D be the rule Du =2u for all u. ⇀⇀⇀⇀
D(⇀u+⇀v)=2(⇀u+⇀v)=2⇀u+2⇀v =D⇀u+D⇀v →LINEAR! 3
D(cu) = 2(cu) = c(2u) = cDu

⇀⇀
Note: Usually we write D(u) as just Du. ⇀
EXAMPLE: Let u be a unit vector in any number of dimensions, let α be any real number, and let S⇀α be the rule
u
⇀
S⇀α :⇀v→⇀v+(α−1)⇀u·⇀v⇀u, u
for any vector v . You can readily verify that this is a linear transformation. If you let ⇀
it act on any vector perpendicular to u, then it has no effect on that vector. If it acts ⇀
on any vector parallel to u, it just stretches that vector by a factor of α. We will call ⇀
this transformation a STRETCHING transformation in the direction of u, with stretching
factor α. If α is negative, the “stretching” just reverses the direction as well as changing the
length; the things we normally call “reflections” are “stretches” of that sort (or products
⇀
of such stretches in higher dimensions). If α is zero, then everything in the direction of u is crushed to zero size, and this is also a sort of stretching or extreme compression.
1.2. THE MATRIX OF A LINEAR TRANSFORMATION
The usual vectors ˆi and ˆj define a square:
4
  
Let’s call this the BASIC BOX in two dimensions. Similarly, ˆi, ˆj, and kˆ define the BASIC BOX in 3 dimensions.
Now let T be any linear transformation. You know that any 2-dimensional vector can be written as aˆi + bˆj, for some numbers a and b. So for any vector, we have
T(aˆi + bˆj) = aTˆi + bTˆj.
This formula tells us something very important: IF I KNOW WHAT T DOES TO ˆi and ˆj, THEN I KNOW EVERYTHING ABOUT T - because now I can tell you what T does to ANY vector.
EXAMPLE: Suppose I know that T(ˆi) = ˆi + 14ˆj and T(ˆj) = 14ˆi + ˆj. Then what is T(2ˆi + 3ˆj)?
Answer: T(2ˆi+3ˆj)=2Tˆi+3Tˆj =2ˆi+ 1ˆj+31ˆi+ˆj=2ˆi+1ˆj+3ˆi+3ˆj = 11ˆi+7ˆj. 442442
Since Tˆi and Tˆj tell me everything I need to know, this means that I can tell you everything about T by telling you WHAT IT DOES TO THE BASIC BOX.
EXAMPLE:LetT bethesametransformationasabove,T(ˆi)=ˆi+14ˆjandT(ˆj)= 14ˆi+ˆj. 5
 
The basic box has been squashed a bit! Pictures of WHAT T DOES TO THE BASIC BOX tell us everything about T!
⇀⇀
EXAMPLE: If D is the transformation Du = 2u, then the Basic Box just gets expanded by a factor of 2 in all directions:
So every LT can be pictured by
seeing what it does to the Basic Box.
There is another way!
ˆ a ˆ b
LetTi= c andTj= d . ThenweDEFINETHEMATRIXOFT RELATIVETO ˆˆab ˆ
i,j as c d , that is, the first COLUMN tells us what happened to i, and the second column tells us what happened to ˆj.
ˆˆ1ˆˆ0 EXAMPLE: Let I be the identity transformation. Then Ii = i = 0 , Ij = j = 1 ,
ˆˆ 1 0 so the matrix of the identity transformation relative to ij is 0 1 .
EXAMPLE: Remember the stretching transformation S⇀α . Let’s consider two dimensions u
and take the special case Sˆ3. It maps ˆi to 3ˆi, and it maps ˆj to itself. So the matrix is i
30 510 0 1 . SimilarlythematrixofSˆj is 0 5 .
⇀⇀ˆ2ˆ0 EXAMPLE:IfDu=2u,thenDi= 0 andDj= 2 sothematrixofDrelativeto
ˆˆ20 i,jis 0 2.
6

11 EXAMPLE:IfTˆi=ˆi+14ˆjandTˆj=14ˆi+j,thenthematrixis 1 4 .
41 EXAMPLE: If Ti = j and Tj = i, the matrix is 1 0 . Basic box is REFLECTED
ˆˆˆˆ01
7

EXAMPLE: Suppose in 3 dimensions Tˆi = ˆi+4ˆj+7kˆ, Tˆj = 2ˆi+5ˆj+8kˆ, Tkˆ = 3ˆi+6ˆj+9kˆ,
123
then the matrix is  4 5 6 , relative to ˆiˆjkˆ.
789
EXAMPLE: Suppose Tˆi = ˆi+ˆj +2kˆ and Tˆj = ˆi−3kˆ. This is an example of a LT
that eats 2-dimensional vectors but PRODUCES 3-dimensional vectors. But it still has a
11
matrix,  1 0 . It’s just that this matrix is not a SQUARE MATRIX, that is, it is not
2 −3
2by2or3by3. Insteaditis3by2.
We shall say that a linear transformation is a 2-dimensional L.T. if it eats 2-dimensional vectors AND produces 2-dimensional vectors. A 2-dimensional L.T. has a square, 2 by 2 matrix relative to ˆi,ˆj. Similarly a 3-dimensional linear transformation has a 3 by 3 matrix. In this chapter we are mainly interested in these two cases; more general cases will be treated later.
EXAMPLE: Suppose T is a linear transformation that eats 3-dimensional vectors and produces
2-dimensional vectors according to the rule Tˆi = 2ˆi, Tˆj = ˆi + ˆj, Tkˆ = ˆi − ˆj. What is its matrix?
211
Answer: 0 1 −1 ,a2by3matrix.
EXAMPLE: Suppose you take a flat square of rubber and SHEAR it, as shown. In other words, you don’t
8

change its volume,
you just push it like a pack
of cards. The base stays fixed but the top moves a distance tan(θ). (The height remains the same, 1 unit.) Clearly the shearing transformation S satisfies Sˆi = ˆi, Sˆj = ˆi tan θ + ˆj,
ˆˆ 1 tanθ so the matrix of S relative to i, j is 0 1 .
ˆˆˆˆˆ11
EXAMPLE: Suppose Ti = i+j and Tj = i+j. Matrix is 1 1 and basic box is
SQUASHED FLAT!
EXAMPLE: Rotations in the plane. Suppose you ROTATE the whole plane through an angle θ (anti-clockwise). Then simple trigonometry shows you that
  Rˆi = cos θˆi + sin θˆj
Rˆj = − sin θi + cos θˆj
So the rotation matrix is
cosθ −sinθ R(θ)= sinθ cosθ .
9

Application: Suppose an object is moving on a circle at constant angular speed ω. What is its acceleration?
⇀
Answer: Let its position vector at t = 0 be r0. Because the object is moving on a circle, ⇀
its position at a later time t is given by rotating r0 by an angle θ(t). So ⇀ cosθ −sinθ⇀
r(t)= sinθ cosθ r0 Differentiate
d⇀r dt
d⇀r dt
 ̇−sinθ −cosθ⇀  ̇
= θ cosθ
−sinθ − cos θ 
− sin θ
r0 by the chain rule. Here θ is actually ω, so ⇀
=
 − sin θ cos θ
ωr0. Differentiate again,
d2 ⇀r  − cos θ sin θ  2 ⇀
dt2 = −sinθ −cosθ ω r0
.
= −ω ⇀
2 cosθ −sinθ⇀ sin θ cos θ r0
Substitute the equation for r (t),
d 2 ⇀r = − ω 2 ⇀r ,
dt2 which is formula you know from physics.
1.3. COMPOSITE TRANSFORMATIONS AND MATRIX MULTIPLICA- TION.
10
  
You know what it means to take the COMPOSITE of two functions: if f(u) = sin(u), and u(x) = x2, then f ◦ u means: “please do u FIRST, THEN f, so
f ◦ u(x) = sin(x2). NOTE THE ORDER!! u ◦ f(x) = sin2(x), NOT the same!
Similarly if A and B are linear transformations, then AB means “do B FIRST, then A”.
NOTE: BE CAREFUL! According to our definition, A and B both eat vectors and both produce vectors. But then you have to take care that A can eat what B produces!
EXAMPLE: Suppose A eats and produces 2-dimensional vectors, and B eats and pro- duces 3-dimensional vectors. Then “AB” would not make sense!
EXAMPLE: Suppose B eats 2-d vectors and produces 3-d vectors (so its matrix relative
 b11 to ˆiˆjkˆ looks like this:  b21
b12 
b22 , a 3 by 2 matrix) and suppose A eats 3-d vectors and
b31
produces 2-d vectors. Then AB DOES make sense, because A can eat what B produces.
(In this case, BA also makes sense.).
IMPORTANT FACT: Suppose aij is the matrix of a linear transformation A relative to
ˆiˆjkˆ, and suppose bij is the matrix of the Linear Transformation B relative to ˆiˆjkˆ. Suppose
that AB makes sense. Then the matrix of AB relative to ˆiˆj or ˆiˆjkˆ is just the matrix 11
b32
 
product of aij and bij.
EXAMPLE: What happens to the vector 2 if we shear 45 parallel to the x axis and
1 ◦
then rotate 90◦ anticlockwise? What if we do the same in the reverse order?
Answer: Shear
1 tanθ →01
1 1
so in this case it is 0 1 . A rotation through θ has matrix sinθ cosθ , so here it
0 −1
is 1 0 Hence
SHEAR, THEN ROTATE
ROTATE, THEN SHEAR
So shear, then rotate
Rotate, then shear
Very different!
0 −11 1 0 −1 →1001=11
1 10 −1 1 −1 →0110=10.
1 0 −11 −2 2→112=3.
1 1 −11 −1 2→102=1
12
cosθ −sinθ

 EXAMPLE: Suppose B is a LT with matrix
10 011
 0 −1andAisaLTwithmatrix −1 1 0 . WhatisthematrixofAB? OfBA?
−1 1 Answer:
0 1 11 0 −1 0 −1100 −1=−1−1=AB
−1 1
2 by 3 3 by 2 2 by 2
10011011 0 −1−110=1 −1 0 −1 1 −1 0 −1
3 by 2 2 by 3 3 by 3
 EXAMPLE: Suppose you take a piece of rubber in 2 dimensions and shear it parallel to
the x axis by θ degrees, and then shear it again by φ degrees. What happens?
1 tanφ1 tanθ 1 tanθ+tanφ 0101=01
which is also a shear, but NOT through θ + φ!
The shear angles don’t add up, since tan θ + tan θ ̸= tan(θ + φ).
EXAMPLE: Rotate 90◦ around z-axis, then rotate 90◦ around x-axis in 3 dimensions. [Always anti-clockwise unless otherwise stated.] Is it the same if we reverse the order?
0 −1 0 Rotate about z axis → i becomes j, j becomes −i,k stays the same, so 1 0 0.
 13
001

100 Rotate about x axis, i stays the same, j becomes k, k becomes −j, so 0 0 −1, and
so the answer is NO!
1.4 DETERMINANTS
1 0 00 −1 0 0 0 −11 0 0 010001
0 −1 01 0 0 ̸=1 0 00 0 −1,
001010
010
  You probably know that the AREA of the box defined by two vectors is
|⇀u × ⇀v |, magnitude
of the vector product.
If you don’t know it, you can easily check it, since the area of any parallelogram is given by
AREA = HEIGHT × Base = |⇀v | sin θ × |⇀u |
= |⇀u| |⇀v|sinθ = | ⇀u × ⇀v | .
Similarly, the VOLUME of a “three-dimensional parallelogram” [called a PARALLELOP- IPED!] is given by
VOLUME = (AREA OF BASE) × HEIGHT. 14

⇀⇀⇀
If you take any 3 vectors in 3 dimensions, say u, v,w, then they define a 3-dimensional parallelogram. The area of the base is |⇀u × ⇀v |,
heightis|⇀w||sin π2 −θ|
where θ is the angle between
⇀u × ⇀v and ⇀w, so VOLUME ⇀⇀⇀
defined by u , v , w is just
|⇀u×⇀v| |⇀w| |sinπ2−θ|
=|⇀u×⇀v| |⇀w| |cosθ|
= | ⇀u × ⇀v · ⇀w | .
[Check: Volume of Basic Box defined by ˆiˆjkˆ is
|ˆi × ˆj · kˆ| = |kˆ · kˆ| = 1, correct!
Now let T be any linear transformation in two dimensions. [This means that it acts on vectors in the xy plane and turns them into other vectors in the xy plane.]
We let T act on the Basic Box, as usual.
15
 
Now Tˆi and Tˆj still lie in the same plane as ˆi and ˆj, so (Tˆi)×(Tˆj) must be perpendicular to that plane. Hence it must be some multiple of kˆ. We define the DETERMINANT of T to be that multiple, that is, by definition, det(T) is the number given [STRICTLY IN 2 DIMENSIONS] by
(Tˆi) × (Tˆj) = det(T)kˆ. EXAMPLE: If I = identity, then
so det(I) = 1.
EXAMPLE: Du = 2u
I ˆi × I ˆj = ˆi × ˆj = kˆ = 1 kˆ
Dˆi × Dˆj = 4ˆi × ˆj = 4kˆ → det(D) = 4
⇀⇀
EXAMPLE: Tˆi = ˆi + 14 ˆj, T ˆj = 14ˆi + ˆj,
ˆ ˆ ˆ 1ˆ 1ˆ ˆ ˆ ˆ 1ˆ ˆ
EXAMPLE: Tˆi = ˆj, Tˆj = ˆi,
Tˆi×Tˆj=ˆj×ˆi=−kˆ→detT =−1 16
Ti×Tj= i+4j × 4i+j =i×j+16j×i = 15ˆi × ˆj = 15 kˆ → det T = 15 .
16 16 16

EXAMPLE: Shear, Sˆi = ˆi, Sˆj = ˆi tan θ + ˆj,
Sˆi × Sˆj = kˆ → det S = 1.
EXAMPLE: Tˆi = ˆi + ˆj = Tˆj,
Tˆi×Tˆj=⇀0 →detT =0.
EXAMPLE: Rotation
Rˆi × Rˆj = (cos θˆi + sin θˆj) × (− sin θˆi + cos θˆj)
= (cos2 θ − − sin2 θ)kˆ = kˆ → det(R) = 1.
The area of the Basic Box is initially |ˆi×ˆj| = 1. After we let T act on it, the area becomes |Tˆi×Tˆj|=|detT| |kˆ|=|det T|.
So
Final Area of Basic Box = |detT| = |detT| Initial Area of Basic Box 1
so |detT| TELLS YOU THE AMOUNT BY WHICH AREAS ARE CHANGED BY T. So det T = ±1 means that the area is UNCHANGED (Shears, rotations, reflections) while det T = 0 means that the Basic Box is squashed FLAT, zero area.
`