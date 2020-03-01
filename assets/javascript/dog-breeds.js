/******************************************************************************
FSWD:  Christopher B. Zenner
Date:  02/29/2020
File:  theme.js
Ver.:  0.1.0 20200229
This JS script provides the word data for a hangman-style game.
******************************************************************************/
var canines = {
  breeds: [
    {
      word: "Labrador Retriever",
      name: "Labrador Retriever",
      temperament: "Friendly, Active, Outgoing",
      description: "The sweet-faced, lovable Labrador Retriever is America’s most popular dog breed. Labs are friendly, outgoing, and high-spirited companions who have more than enough affection to go around for a family looking for a medium-to-large dog.",
      img: "assets/images/labrador-retriever.jpg"
    },
    {
      word: "German Shepherd",
      name: "German Shepherd",
      temperament: "Confident, Courageous, Smart",
      description: "Generally considered dogkind’s finest all-purpose worker, the German Shepherd Dog is a large, agile, muscular dog of noble character and high intelligence. Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover’s delight.",
      img: "assets/images/german-shepherd.jpg"
    },
    {
      word: "Golden Retriever",
      name: "Golden Retriever",
      temperament: "Friendly, Intelligent, Devoted",
      description: "The Golden Retriever, an exuberant Scottish gundog of great beauty, stands among America’s most popular dog breeds. They are serious workers at hunting and field work, as guides for the blind, and in search-and-rescue, enjoy obedience and other competitive events, and have an endearing love of life when not at work.",
      img: "assets/images/golden-retriever.jpg"
    },
    {
      word: "French Bulldog",
      name: "French Bulldog",
      temperament: "Adaptable, Playful, Smart",
      description: "The one-of-a-kind French Bulldog, with his large bat ears and even disposition, is one of the world’s most popular small-dog breeds, especially among city dwellers. The Frenchie is playful, alert, adaptable, and completely irresistible.",
      img: "assets/images/french-bulldog.jpg"
    },
    {
      word: "Bulldog",
      name: "Bulldog",
      temperament: "Friendly, Courageous, Calm",
      description: "Kind but courageous, friendly but dignified, the Bulldog is a thick-set, low-slung, well-muscled bruiser whose 'sourmug' face is the universal symbol of courage and tenacity. These docile, loyal companions adapt well to town or country.",
      img: "assets/images/bulldog.jpg"
    },
    {
      word: "Beagle",
      name: "Beagle",
      temperament: "Friendly, Curious, Merry",
      description: "Not only is the Beagle an excellent hunting dog and loyal companion, it is also happy-go-lucky, funny, and—thanks to its pleading expression—cute. They were bred to hunt in packs, so they enjoy company and are generally easygoing.",
      img: "assets/images/beagle.jpg"
    },
    {
      word: "Poodle",
      name: "Poodle",
      temperament: "Active, Proud, Very Smart",
      description: "Whether Standard, Miniature, or Toy, and either black, white, or apricot, the Poodle stands proudly among dogdom’s true aristocrats. Beneath the curly, low-allergen coat is an elegant athlete and companion for all reasons and seasons.",
      img: "assets/images/poodle.jpg"
    },
    {
      word: "Rottweiler",
      name: "Rottweiler",
      temperament: "Loyal, Loving, Confident Guardian",
      description: "The Rottweiler is a robust working breed of great strength descended from the mastiffs of the Roman legions. A gentle playmate and protector within the family circle, the Rottie observes the outside world with a self-assured aloofness.",
      img: "assets/images/rottweiler.jpg"
    },
    {
      word: "Yorkshire Terrier",
      name: "Yorkshire Terrier",
      temperament: "Affectionate, Sprightly, Tomboyish",
      description: "Beneath the dainty, glossy, floor-length coat of a Yorkshire Terrier beats the heart of a feisty, old-time terrier. Yorkies earned their living as ratters in mines and mills long before they became the beribboned lapdogs of Victorian ladies.",
      img: "assets/images/yorkshire-terrier.jpg"
    },
    {
      word: "German Shorthaired Pointer",
      name: "German Shorthaired Pointer",
      temperament: "Friendly, Smart, Willing to Please",
      description: "The versatile, medium-sized German Shorthaired Pointer is an enthusiastic gundog of all trades who thrives on vigorous exercise, positive training, and a lot of love. GSP people call their aristocratic companions the 'perfect pointer.'",
      img: "assets/images/german-shorthaired-pointer.jpg"
    },
    {
      word: "Boxer",
      name: "Boxer",
      temperament: "Bright, Fun-loving, Active",
      description: "Loyalty, affection, intelligence, work ethic, and good looks: Boxers are the whole doggy package. Bright and alert, sometimes silly, but always courageous, the Boxer has been among America’s most popular dog breeds for a very long time.",
      img: "assets/images/boxer.jpg"
    },
    {
      word: "Siberian Husky",
      name: "Siberian Husky",
      temperament: "Loyal, Mischievous, Outgoing",
      description: "The Siberian Husky, a thickly coated, compact sled dog of medium size and great endurance, was developed to work in packs, pulling light loads at moderate speeds over vast frozen expanses. This northern breed is friendly, fastidious, and dignified.",
      img: "assets/images/siberian-husky.jpg"
    },
    {
      word: "Dachshund",
      name: "Dachshund",
      temperament: "Friendly, Curious, Spunky",
      description: "The famously long, low silhouette, ever-alert expression, and bold, vivacious personality of the Dachshund have made him a superstar of the canine kingdom. Dachshunds come in two sizes and in three coat types of various colors and patterns.",
      img: "assets/images/dachshund.jpg"
    },
    {
      word: "Great Dane",
      name: "Great Dane",
      temperament: "Friendly, Patient, Dependable",
      description: "The easygoing Great Dane, the mighty 'Apollo of Dogs,' is a total joy to live with—but owning a dog of such imposing size, weight, and strength is a commitment not to be entered into lightly. This breed is indeed great, but not a Dane.",
      img: "assets/images/great-dane.jpg"
    },
    {
      word: "Pembroke Welsh Corgi",
      name: "Pembroke Welsh Corgi",
      temperament: "Affectionate, Smart, Alert",
      description: "Among the most agreeable of all small housedogs, the Pembroke Welsh Corgi is a strong, athletic, and lively little herder who is affectionate and companionable without being needy. They are one of the world's most popular herding breeds.",
      img: "assets/images/pembroke-welsh-corgi.jpg"
    },
    {
      word: "Doberman Pinscher",
      name: "Doberman Pinscher",
      temperament: "Loyal, Fearless, Alert",
      description: "Sleek and powerful, possessing both a magnificent physique and keen intelligence, the Doberman Pinscher is one of dogkind's noblemen. This incomparably fearless and vigilant breed stands proudly among the world's finest protection dogs.",
      img: "assets/images/doberman-pinscher.jpg"
    },
    {
      word: "Australian Shepherd",
      name: "Australian Shepherd",
      temperament: "Smart, Work-Oriented, Exuberant",
      description: "The Australian Shepherd, a lean, tough ranch dog, is one of those 'only in America' stories: a European breed perfected in California by way of Australia. Fixtures on the rodeo circuit, they are closely associated with the cowboy life.",
      img: "assets/images/australian-shepherd.jpg"
    },
    {
      word: "Miniature Schnauzer",
      name: "Miniature Schnauzer",
      temperament: "Friendly, Smart, Obedient",
      description: "The Miniature Schnauzer, the smallest of the three Schnauzer breeds, is a generally healthy, long-lived, and low-shedding companion. Add an outgoing personality, a portable size, and sporty good looks, and you’ve got an ideal family dog.",
      img: "assets/images/miniature.schnauzer.jpg"
    },
    {
      word: "Cavalier King Charles Spaniel",
      name: "Cavalier King Charles Spaniel",
      temperament: "Affectionate, Gentle, Graceful",
      description: "The Cavalier King Charles Spaniel wears his connection to British history in his breed’s name. Cavaliers are the best of two worlds, combining the gentle attentiveness of a toy breed with the verve and athleticism of a sporting spaniel.",
      img: "assets/images/cavalier-king-charles-spaniel.jpg"
    },
    {
      word: "Shih Tzu",
      name: "Shih Tzu",
      temperament: "Affectionate, Playful, Outgoing",
      description: "That face! Those big dark eyes looking up at you with that sweet expression! It’s no surprise that Shih Tzu owners have been so delighted with this little 'Lion Dog' for a thousand years. Where Shih Tzu go, giggles and mischief follow.",
      img: "assets/images/shih-tzu.jpg"
    },
    {
      word: "Boston Terrier",
      name: "Boston Terrier",
      temperament: "Friendly, Bright, Amusing",
      description: "The Boston Terrier is a lively little companion recognized by his tight tuxedo jacket, sporty but compact body, and the friendly glow in his big, round eyes. His impeccable manners have earned him the nickname 'The American Gentleman.'",
      img: "assets/images/boston-terrier.jpg"
    },
    {
      word: "Pomeranian",
      name: "Pomeranian",
      temperament: "Inquisitive, Bold, Lively",
      description: "The tiny Pomeranian, long a favorite of royals and commoners alike, has been called the ideal companion. The glorious coat, smiling, foxy face, and vivacious personality have helped make the Pom one of the world's most popular toy breeds.",
      img: "assets/images/pomeranian.jpg"
    },
    {
      word: "Havanese",
      name: "Havanese",
      temperament: "Intelligent, Outgoing, Funny",
      description: "Havanese, the only dog breed native to Cuba, are cheerful little dogs with a spring in their step and a gleam in their big, brown eyes. These vivacious and sociable companions are becoming especially popular with American city dwellers.",
      img: "assets/images/havanese.jpg"
    },
    {
      word: "Shetland Sheepdog",
      name: "Shetland Sheepdog",
      temperament: "Playful, Energetic, Bright",
      description: "The Shetland Sheepdog, also known as the Sheltie, is an extremely intelligent, quick, and obedient herder from Scotland’s remote and rugged Shetland Islands. Shelties bear a strong family resemblance to their bigger cousin, the Collie.",
      img: "assets/images/shetland-sheepdog.jpg"
    },
    {
      word: "Bernese Mountain Dog",
      name: "Bernese Mountain Dog",
      temperament: "Good-Natured, Calm, Strong",
      description: "Big, powerful, and built for hard work, the Bernese Mountain Dog is also strikingly beautiful and blessed with a sweet, affectionate nature. Berners are generally placid but are always up for a romp with the owner, whom they live to please.",
      img: "assets/images/bernese-mountain-dog.jpg"
    }
  ]
};