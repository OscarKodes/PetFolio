const mongoose   = require("mongoose"),
      Pet        = require("./models/pet"),
      Img        = require("./models/img");

// CAT IMGS============================
const catImg1 = new Img({
  image: "https://pbs.twimg.com/media/DVIYbTlXkAYMgE_.jpg",
  caption: "Wake up from a nap."
});

const catImg2 = new Img({
  image: "https://pbs.twimg.com/media/DVRDx0YW4AEbhb2.jpg",
  caption: "Contemplating why human is still alive after multiple attempts."
});

const catImg3 = new Img({
  image: "https://pbs.twimg.com/media/DVLNMBPW0AA1PcT.jpg",
  caption: "Not so angry when she's eating..."
});

const catImgs = [catImg1, catImg2, catImg3];

// DOG IMAGES =============================
const dogImg1 = new Img({
  image: "https://pbs.twimg.com/media/BpLsNOIIUAAa-eQ.jpg",
  caption: "Pongo as a puppy."
});

const dogImg2 = new Img({
  image: "https://pbs.twimg.com/profile_images/435987853592375296/_m-rDgJF.jpeg",
  caption: "Pongo all grown up."
});

const dogImg3 = new Img({
  image: "https://pbs.twimg.com/media/Dh1pGKFXUAE4oFz.jpg",
  caption: "Pongo made a friend"
});

const dogImgs = [dogImg1, dogImg2, dogImg3];

// GOLD IMAGES ============================================
const goldImg1 = new Img({
  image: "https://pbs.twimg.com/media/DloqAoAV4AAshIx.jpg",
  caption: "Binnie as a puppy."
});

const goldImg2 = new Img({
  image: "https://pbs.twimg.com/media/EA5FmS2VAAA5b9G.jpg",
  caption: "Binnie all grown up."
});

const goldImg3 = new Img({
  image: "https://pbs.twimg.com/media/D_xH40KUwAEQrln.jpg",
  caption: "Binnie in his formal attire."
});

const goldImgs = [goldImg1, goldImg2, goldImg3];

// ARR OF ARR OF IMGS============================
const imgArrArr = [catImgs, dogImgs, goldImgs];

// DECLARE PETS ============================================
const newPet1 = new Pet({
  name: "Nitrogen",
  avatar: "https://pbs.twimg.com/media/D3Otj6kWsAAVQnX.jpg",
  gender: "Female",
  species: "Cat",
  breed: "Explosive",
  info: "Likes to suddenly flail about without warning.",
});

const newPet2 = new Pet({
  name: "Pongo",
  avatar: "https://pbs.twimg.com/media/Dg2QMMJWAAAyXU5.jpg",
  gender: "Male",
  species: "Dog",
  breed: "Dalmation",
  info: "Likes to chew on slippers.",
});

const newPet3 = new Pet({
  name: "Binnie",
  avatar: "https://pbs.twimg.com/media/D9_qNqvW4AIkEMZ.jpg",
  gender: "Male",
  species: "Dog",
  breed: "Retriever",
  info: "Sheds a lot.",
});

const newPets = [newPet1, newPet2, newPet3];

// SEED FUNCTION
function seedDB() {

  newPets.forEach(function(pet, index) {
    Pet.create(pet, function(err, newPet){
      if (err) {
        console.log(err);
      } else {
        let currImgs = imgArrArr[index];
        currImgs.forEach(function(img, i){
          Img.create(img, function(err, newImg){
            if (err) {
              console.log(err);
            } else {
              newPet.imgs.push(newImg);
              if (newPet.imgs.length === 3) {
                newPet.save();
                console.log(newPet);
              }
            }
          });
        });
      }
    })
  })
}

module.exports = seedDB;
