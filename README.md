# Walmad E-Commerce Web Application

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

This project was done as a final project of the front-end module at [Integrify](https://www.integrify.io/). It reflects the basic functionalities of a typical e-commerce application. The data is fetched and can be created, deleted, updated from [this API](https://fakeapi.platzi.com/en/rest/introduction). The application comes with an authentication system with defined roles for users. Basic users can interact with the products by filtering, searching, sorting, or adding, removing them from their cart. While the admin can perform CRUD operations on the products in their own dashboard. All the features will be discussed in [User Interface](#user-interface) section.

## Table of content

1. [Technologies](#technologies)
2. [Project Structure](#project-structure)
3. [Global State & Reducers](#global-state-&-reducers)
4. [User Interface](#user-interface)
5. [Getting Started](#getting-started)

## Technologies

- TypeScript
- React
- Redux
- Material-UI
- Testing with Jest

## Project Structure
````
src/
┣ components/
┃ ┣ AddressForm.tsx
┃ ┣ AppPagination.tsx
┃ ┣ CardsContainer.tsx
┃ ┣ Cart.tsx
┃ ┣ CategorySlide.tsx
┃ ┣ DarkToggleMode.tsx
┃ ┣ FiltersContainer.tsx
┃ ┣ Footer.tsx
┃ ┣ ImageLinkGenerator.tsx
┃ ┣ ItemInCart.tsx
┃ ┣ NavBar.tsx
┃ ┣ PaymentForm.tsx
┃ ┣ ProductCard.tsx
┃ ┣ ProductDetailsCard.tsx
┃ ┣ ProductForm.tsx
┃ ┣ ProductsLimiter.tsx
┃ ┣ ProductsSorter.tsx
┃ ┣ ProductsTable.tsx
┃ ┣ Review.tsx
┃ ┗ SearchBox.tsx
┣ hooks/
┃ ┣ useAppDispatch.ts
┃ ┗ useAppSelector.ts
┣ interfaces/
┃ ┣ AddressFormInput.ts
┃ ┣ AddressFormProps.ts
┃ ┣ AppPaginationProps.ts
┃ ┣ CartItem.ts
┃ ┣ Category.ts
┃ ┣ CreateProductInput.ts
┃ ┣ GoogleProfile.ts
┃ ┣ PaginationQuery.ts
┃ ┣ PaymentFormInput.ts
┃ ┣ PaymentFormProps.ts
┃ ┣ Product.ts
┃ ┣ ProductDetailsCardProps.ts
┃ ┣ ProductFormProps.ts
┃ ┣ ProductInputForm.ts
┃ ┣ ProductsLimiterProps.ts
┃ ┣ ProductsSorterProps.ts
┃ ┣ ProductsTableProps.ts
┃ ┣ ReviewProps.ts
┃ ┣ SearchBarProps.ts
┃ ┣ UpdateProductInput.ts
┃ ┣ User.ts
┃ ┣ UserCredentials.ts
┃ ┣ UserRegisterInput.ts
┃ ┗ UsersReducerState.ts
┣ pages/
┃ ┣ AdminDashboard.tsx
┃ ┣ CheckOut.tsx
┃ ┣ ErrorPage.tsx
┃ ┣ Home.tsx
┃ ┣ Login.tsx
┃ ┣ ProductDetails.tsx
┃ ┣ Products.tsx
┃ ┣ ProductsByCategory.tsx
┃ ┣ Profile.tsx
┃ ┣ Register.tsx
┃ ┗ Root.tsx
┣ redux/
┃ ┣ reducers/
┃ ┃ ┣ cartReducer.ts
┃ ┃ ┣ categoriesReducer.ts
┃ ┃ ┣ productsReducers.ts
┃ ┃ ┗ usersReducer.ts
┃ ┗ store.ts
┣ test/
┃ ┣ data/
┃ ┃ ┣ cartData.ts
┃ ┃ ┣ categoriesData.ts
┃ ┃ ┣ productsData.ts
┃ ┃ ┗ usersData.ts
┃ ┣ redux/
┃ ┃ ┣ cartReducer.test.ts
┃ ┃ ┣ categoriesReducer.test.ts
┃ ┃ ┣ productsReducer.test.ts
┃ ┃ ┗ usersReducer.test.ts
┃ ┗ shared/
┃   ┣ categoryServer.ts
┃   ┣ productServer.ts
┃   ┗ userServer.ts
┣ utils/
┃ ┣ CheckAdmin.tsx
┃ ┗ CheckAuth.tsx
┣ App.tsx
┣ index.css
┣ index.tsx
┣ react-app-env.d.ts
┣ reportWebVitals.ts
┣ setupTests.ts
┗ ThemeProvider.tsx
````
## Global State & Reducers

Thanks to Redux Toolkit, the data is stored in a global store and can be accessed across all the components. There are four reducers in the store of this application: `productsReducer`, `userReducer`, `categoriesReducer`, `cartReducer`. The diagram belows demonstrates all the actions of each reducer and their required privilege. All the actions have been tested properly with Jest.

![IMG1](./screenshots/Blank_diagram.jpeg)

## User Interface

In the home page of the application, you can see all the available categories the recently added products: 

![IMG2](./screenshots/screenshot_1.jpg)

Clicking on a categorey will reveal all the products by that category:

![IMG3](./screenshots/screenshot_2.jpg)

While navigating to "/products" will reveal all the products in the database:

![IMG4](./screenshots/screenshot_3.jpg)

You search for products by title, limit products displayed on a page, sort by title or price, navigating through the pagination system:

![IMG5](./screenshots/screenshot_4.jpg)

![IMG6](./screenshots/screenshot_5.jpg)

The product details page as the name suggests, show all the information of the product and also recommends users with some similar products. Users can type in the quantity before adding the product to their cart:

![IMG7](./screenshots/screenshot_6.jpg)

The cart is a modal which can be openned at any time by clicking the icon on the navigation bar. In the cart you can increase, decrease quantity or remove an item completely, before heading to the checkout page. 

![IMG8](./screenshots/screenshot_7.jpg)

The checkout page includes two form: address form and credit card form. The review tab will show the user all the items in the cart with entered information again before they can place the order:

![IMG9](./screenshots/screenshot_8.jpg)

![IMG10](./screenshots/screenshot_9.jpg)

![IMG11](./screenshots/screenshot_10.jpg)

![IMG12](./screenshots/screenshot_11.jpg)

The login form is where users enter their creadentials. Successfully logging in will navigate them to the home screen with a success message:

![IMG13](./screenshots/screenshot_12.jpg)

![IMG14](./screenshots/screenshot_13.jpg)

The register form is where users can create their account. They can also fill the form automatically by signing in using their Google account. There is also an Image URL Generator (Since the User API only takes image as a string) so user can upload their image and get a link from the server, before pasting them into the form:

![IMG15](./screenshots/screenshot_14.jpg)

The user profile page show all the information of the logged in user. Logging out while being on this page will send users back the home page.

![IMG16](./screenshots/screenshot_15.jpg)

If you log in as an admin, you have the right to create, update or delete any product from the product database. The product form has two mode: "create" (by default), and "edit". In "create" mode, submitting the form will the product to the list. When you press the edit button on any product row, the form will be changed to edit mode and be filled with information of that product. Edit any information before submitting them to update the product. Deleting a product will prompt users with a confirmation modal before removing it from the system.

![IMG17](./screenshots/screenshot_16.jpg)

![IMG18](./screenshots/screenshot_17.jpg)

![IMG19](./screenshots/screenshot_18.jpg)

There is also a dark mode which can be toggled by clicking the switch on the navigation bar:

![IMG20](./screenshots/screenshot_19.jpg)

## Getting Started

1. Open your terminal and clone the repository with the following command: 
```
git clone https://github.com/tduyphat/fs16_6-frontend-project
```

2. Install all the packages:

```
npm install
```

3. Start the application in your local machine:

```
npm start
```

4. If you want to use the Google Sign In feature in your local machine, create a file called `.env` in the root of the project. In the file, create this value: `REACT_APP_CLIENT_ID = "<YOUR_CLIENT_ID>"`. Check out this [documentation](https://support.google.com/googleapi/answer/6158849?hl=en) to see how you can obtain a client ID from Google.

5. Or simply access the deployed version on Netlify from this [link](https://phat-tran-walmad.netlify.app/).










