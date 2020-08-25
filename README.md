# Pomino-Vis

![sample](./src/images/sample.png)

This project visualizes the Pomino v2 data created by [Peking University ACM Group](http://www.pku-atmos-acm.org/acmProduct.php/). It is currently working as a standalone front-end application
powered by [React](https://reactjs.org/), Mapbox GL JS, or more specifically [React-Map-GL](https://visgl.github.io/react-map-gl/), and [deck.gl](https://deck.gl/). 

It is important to point out that the **color intensity** of each data point doesn't
represent the ***absolute*** value for a parameter; in fact, what luminance tells us is the 
***relative*** value compared to other data points. This makes the visualization
less scientifically accurate but easier to implement. Therefore, this visulization
may be used for scientific education purposes but not research.

***Future TODOs:***  
1. Create a backend for this app and retrieve data from API calls;  
2. Be more scientifically accurate, and maybe create a colorbar. 

***Related:***
Maybe a Python repository to show how I have handled the *RAW* data...