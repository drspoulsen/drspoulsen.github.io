---
layout: post
title: Sharing (is) a Piece of Cake
---

When my partner and I get takeout from a local Italian restaurant, we like to order one slice of cake to split for desert. The slice of cake is very tall, but very skinny, so it comes in a container laying on its side. The slice is thin enough that we do not want to split the cake by turning it upright and creating two equal slices. Instead, we keep the cake on its side and cut it in a way that creates a wedge as one piece, and the rest of the cake as the other piece. Where should the slice be made to result in an even split? 

### Get Out Your Protractor and Ruler, We're Having Cake!

It's time to discuss mathematics, so by convention I wil switch to using "we" (as in, you and I, dear reader). First, we realize that the answer must depend on the angular size of the cake, since if the angle were extremely small, the place to make the cut would be nearly half the length of the slice. 

So, we will model the slice of cake as a sector of a cylinder of radius one, with angle of $$\theta$$. To simplify things more, we recognize that the volume of the slice is the area of the top of the slice times the height of the cake, so we can just consider a sector of a circle of radius one with angle $$\theta$$ in the "standard position" for a triangle.

Now, we will cut the cake perpindicular to the $x$-axis, at some number $$x=c, 0<c<1$$. This creates a right triangle with base $$c$$ and height $$c \tan(\theta)$$, since the tangent of an angle is the ratio of the opposite to the adjacent side of a triangle. The area of the wedge shape is $$A_{\wedge} = 1/2 c^2 \tan(\theta)$$. In order to share fairly, $$A_{\text{wedge}}$$ must be half the the area of the entire slice, $$A_{\text{slice}}1/2 \theta $$. That is

$$1/2 c^2 \tan(\theta) = 1/4 \theta .$$

Solving for $$c$$, we find $$c=\sqrt{1/2 \theta \cot(\theta)}$$ (ignoring the negative solution, since it doesn't make sense in the context of the problem). 

### Some Examples

According to our house rules, a slice is legally defined to be one eighth of the whole. Therefore, for a slice of cake, the cut should be made at $$c=\sqrt{(1/2) (\pi/4) \cot(\pi/4)} = \sqrt(\pi/8) \approx 0.62665706...$$

