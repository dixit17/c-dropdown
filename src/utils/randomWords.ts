const randomWords = ["Excited","testing a long option Anxious Operating System", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", 
"Gargantuan", "Broad", "Crooked", "Curved", "Deep", "Even", "Excited", "Anxious", "Overweight","Demonic", 
"Jumpy", "Misunderstood", "Squashed", "Gargantuan", "Broad", "Crooked", "Curved", "Deep","Even", "Flat", 
"Hilly", "Jagged", "Round", "Shallow", "Square", "Steep", "Straight", "Thick", "Thin", "Cooing", "Deafening", 
"Faint", "Harsh", "High-pitched", "Hissing", "Hushed", "Husky", "Loud", "Melodic", "Moaning", "Mute", "Noisy", 
"Purring", "Quiet", "Raspy", "Screeching", "Shrill", "Silent", "Soft", "Squeaky", "Squealing", "Thundering", 
"Voiceless", "Whispering","Taco", "Operating System", "Sphere", "Watermelon", "Cheeseburger", "Apple Pie", "Spider", "Dragon",
"Remote Control", "Soda", "Barbie Doll", "Watch", "Purple Pen", "Dollar Bill", "Stuffed Animal", 
"Hair Clip", "Sunglasses", "T-shirt", "Purse", "Towel", "Hat", "Camera", "Hand Sanitizer Bottle", "Photo", 
"Dog Bone", "Hair Brush", "Birthday Card",]



export const generateRandomWords = () => {
    let result = []
    for (var i = 0; i < randomWords.length - 10; i++) {
      result.push({
        id: i + 1,
        name: randomWords[i],
        active:false
      })
    }
    return result;
  }