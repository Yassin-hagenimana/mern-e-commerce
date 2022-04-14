import bcrypt from "bcryptjs"
const data={

  users:[
    {
      name:"Yassin",
      email:"hyassin509@gmail.com",
      password:bcrypt.hashSync("123456"),
      isAdmin:true
  },
  {
      name:"draxler",
      email:"draxler509@gmail.com",
      password:bcrypt.hashSync("123456"),
      isAdmin:false
  }
],
    products:[
        {
           // _id:"1",
            name:'Nike slim shirt',
            slug:'adidas-slim-shirt',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:120,
            countInStock:0,
            brand:'Puma',
            rating:4.5,
            numReviews:10,
            description:'High quality shirt'
        },
        {
          //  _id:"2",
            name:'Nike fit shirt',
            slug:'nike-fit-shirt',
            category:'Shirts',
            image:'/images/p2.jpg',
            price:120,
            countInStock:2,
            brand:'Puma',
            rating:4.5,
            numReviews:10,
            description:'High quality shirt'
        },
        {
           // _id:"3",
            name:'Nike slim pant',
            slug:'adidas-slim-pant',
            category:'Shirts',
            image:'/images/p3.jpg',
            price:120,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'High quality shirt'
        },
        {
          //  _id:"4",
            name:'Nike fit pant',
            slug:'nike-fit-pant',
            category:'Shirts',
            image:'/images/p4.jpg',
            price:120,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:'High quality shirt'
        },
    ]
}
export default data;