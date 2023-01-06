---
layout: post
title: Sharing (is) a Piece of Cake
host: mathstodon.xyz
username: dpoulsen
com_id: 109610772913252424
---

When my wife and I get takeout from a local Italian restaurant, we like to order one slice of cake to split for dessert. The slice of cake is very tall, but very skinny, so it comes in a container laying on its side. The slice is thin enough that we do not want to split the cake by turning it upright and creating two equal slices. Instead, we keep the cake on its side and cut it in a way that creates a wedge as one piece, and the rest of the cake as the other piece. 

**Where should the slice be made to result in an even split?**

![A Slice of Cake](/images/real_cake.jpg)

## Quick Remark 

As long as people have had to share limited resources, fair sharing has been a topic of interest. For sharing food, a common technique is the "I cut, you choose" method, where one person makes a cut that they deem fair, and the second person chooses which portion to take. This ensures both parties are happy with the result. 

This particular problem is potentially deceptive, since it is hard to estimate volumes of different shapes. The analysis to follow can at least set a good baseline for an "I cut, you choose" strategy. That said, it does not account for frosting distribution, amongst other factors.

## Get Out Your Protractor and Ruler, We're Having Cake!

It's time to discuss mathematics, so by convention I wil switch to using "we" (as in, you and I, dear reader). First, we realize that the answer must depend on the angular size of the cake, since if the angle were extremely small, the place to make the cut would be nearly half the length of the slice. 

So, we will model the slice of cake as a sector of a cylinder of radius one, with angle of $$\theta$$. To simplify things more, we recognize that the volume of the slice is the area of the top of the slice times the height of the cake, so we can just consider a sector of a circle of radius one with angle $$\theta$$ in the "standard position" for a triangle.

Now, we will cut the cake perpindicular to the $$x$$-axis, at some number $$x=c, 0<c<1$$. This creates a right triangle with base $$c$$ and height $$c \tan(\theta),$$ since the tangent of an angle is the ratio of the opposite to the adjacent side of a triangle. 

![Diagram for theta equals pi divided by 4](/images/cake_general.png)

The area of the wedge shape is $$A_{wedge} = \frac{1}{2} c^2 \tan(\theta).$$ In order to share fairly, $$A_{\text{wedge}}$$ must be half the the area of the entire slice, $$A_{\text{slice}}=\frac{1}{2} \theta.$$ That is

$$\frac{1}{2} c^2 \tan(\theta) = \frac{1}{4} \theta.$$

Solving for $$c$$, we find $$c=\sqrt{\frac{1}{2} \theta \cot(\theta)}$$ (ignoring the negative solution, since it doesn't make sense in the context of the problem). 

## Some Examples

### $$\theta = \pi/4$$

According to our house rules, a slice is legally defined to be one eighth of the whole. Therefore, for a slice of cake, the cut should be made at 

$$c=\sqrt{\frac{1}{2} \left( \frac{\pi}{4} \right) \cot \left(\frac{\pi}{4} \right)} = \sqrt{ \frac{\pi}{8} } \approx 0.6266570686.$$

![Diagram for theta equals pi divided by 4](/images/cake_pi_4.png)

### $$\theta = \pi/6$$


Restaurants are not bound by house rules, so another likely definition of a slice is one twelfth of the whole. In this case, the cut should be made at

$$c=\sqrt{\frac{1}{2} \left( \frac{\pi}{6} \right) \cot \left(\frac{\pi}{6} \right)}  \approx 0.6733868435.$$

This is a really nice result, since for any realistic application this means the cake should be cut to the 2/3 of its base length, which is easily estimatable.

![Diagram for theta equals pi divided by 4](/images/cake_pi_6.png)

## Further thoughts on sharing

Serious mathematics has been inspired by sharing cake. Steinhaus posed to his students the problem of whether there was a strategy like the "I cut, you choose" method for sharing a cake amongst $$n$$ people. These students, Banach and Knaster (yes, the Banach of Banach spaces, Banach-Tarski paradox, Banach fixed-point theorem, etc) solved this problem [^1], which will be the subject of a future blog post.

[^1]: [Martin L. Jones. "A Note on a Cake Cutting Algorithm of Banach and Knaster," *The American Mathematical Monthly*](https://www.jstor.org/stable/2974584)