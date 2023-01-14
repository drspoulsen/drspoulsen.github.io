Thanks to my sum_discrete_fourier.pdf paper, to me it seems that if we have a finite signal on a finite time scale with graininess set $$ M =\{\mu_1, \mu_2,...,\mu_n\}, $$, with $$ p:=\sum_{k=1}^{n} \mu_k $$ then we are really just taking a sum of Fourier Transforms of *period-one* sequences (the sequence $$\{f_m^{j-1}\}$$ in the original paper would be constant on the time scale $$\mathbb{Z}$$ (we could also move to $$p \mathbb{Z}$$)). So, we are going to get a (kind of) complicated sum of just $$n$$ things. Those $$n$$ things will be weighted by the hilger real part and hilger imaginary part. So, in the forward direction we'll get sums of multiples of 1/(1-e^(-i \omega)) for various values of \omega and \delta functions. We should get similar things in the backwards direction. 

If we have a finite signal over a periodic time scale where the signal length is longer than the period of the time scale, then we'll have a sum of DTFs 

Useful slides: https://spinlab.wpi.edu/courses/ece503_2014/11-3dtft_of_periodic_sequence.pdf

Let's do an example

\mathbb{T}_{1,2} = \{0,1,3,4,6,7,9,...}
f(t) = \sin( \pi/32 t); 0 \leq t \leq 63
x(n) = \{\sin(0), \sin(3 \pi/32), \sin(6 \pi/32),...., \sin(63 \pi/32)} = \{\sin(3n \pi/32)\}_{n=0}^{21}
y(n) = \{\sin(\pi/32), \sin(4 \pi/32),\sin(7 \pi/32),... \sin(64 \pi/32)} = \{\sin((3n+1) \pi/32)\}_{n=0}^{21}

According the the slides, the DTFT of x(n) is

{\cal F}_{\mathbb{Z}}\{x\}(e^{i \omega}) = frac{2 \pi}{22} \sum_{t=\infty}^{\infty} \sum_{n=0}^{21} x(n) e^{-2 \pi i r n/22} \delta(\omega-\frac{2 \pi r}{N})


