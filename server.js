//set up express and port (having already run npm commands)

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//doing with json array as was advised in workshop 
//I acknowledge this would be cleaner code if I had the seed file separately but as I am also working on doing this in Java/Springboot, I am just going to leave as an array 
let snippets = [
    {
      "id": 1,
      "language": "Python",
      "code": "print('Hello, World!')"
    },
    {
      "id": 2,
      "language": "Python",
      "code": "def add(a, b):\n    return a + b"
    },
    {
      "id": 3,
      "language": "Python",
      "code": "class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return 3.14 * self.radius ** 2"
    },
    {
      "id": 4,
      "language": "JavaScript",
      "code": "console.log('Hello, World!');"
    },
    {
      "id": 5,
      "language": "JavaScript",
      "code": "function multiply(a, b) {\n    return a * b;\n}"
    },
    {
      "id": 6,
      "language": "JavaScript",
      "code": "const square = num => num * num;"
    },
    {
      "id": 7,
      "language": "Java",
      "code": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
    },
    {
      "id": 8,
      "language": "Java",
      "code": "public class Rectangle {\n    private int width;\n    private int height;\n\n    public Rectangle(int width, int height) {\n        this.width = width;\n        this.height = height;\n    }\n\n    public int getArea() {\n        return width * height;\n    }\n}"
    }
  ];

app.post("/snippets", (req, res) =>{
    const { id, code, lang } = req.body;
    const snippetToAdd = { id, code, lang };
    snippets.push(snippetToAdd);
    res.status(201).json(snippets);
});

app.get("/snippets", (req, res) =>{
    res.status(200).json(snippets);
});

app.get("/snippets/:id", (req, res) =>{
    //used .find because I specifically wanted it to be using the id, not just the position in the array which is how I would usually code this
    const snippet = snippets.find(snip => snip.id == req.params.id);
    res.status(200).json(snippet);
});

app.get("/snippets", (req, res) =>{
    const filterByLanguage = req.query.lang;
    if (filterByLanguage) {
        //found .filter() which creates a new array with those that satisfy a specific condition 
        // I wanted to find something similar to streams() which I have been learning in java recently 
        const filtered = snippets.filter(snip => snip.language.toLowerCase() === filterByLanguage.toLowerCase());
        return res.status(200).json(filtered);
    }
    res.status(200).json(snippets);
});

//add in listen function
app.listen(port, () => {
    console.log(`Snipper API running on http://localhost:${port}`);
});
