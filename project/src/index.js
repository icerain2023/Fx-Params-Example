import "p5"

var ParamsEntity=[
  {
    id: "Count_id",
    name: "Count",
    type: "bigint",
    options: {
      min: 5,
      max: 30,
      step: 1,
    },
  },
  {
    id: "Shape_id",
    name: "shape",
    type: "select",
    default: "square",
    options: {
      options: ["square", "circle", "mix"],
    }
  },
  {
    id: "Color_id",
    name: "Fill color",
    type: "color",
    default: "ff0000",
  },
  {
    id: "FreamOn_id",
    name: "FreamOn",
    type: "boolean",
    default: true,
  },
  {
    id: "Sign_id",
    name: "Sign",
    type: "string",
    default: "IceRain",
    options: {
      minLength: 1,
      maxLength: 64
    }
  },
]
$fx.params(ParamsEntity)


if($fx.getParam("Shape_id") == "mix")
{
  ParamsEntity.push(
      {
        id: "SquareOdds_id",
        name: "SquareOdds",
        type: "number",
        options: {
          min: 0,
          max: 1,
          step: 0.001,
        },
      },
  )
  $fx.params(ParamsEntity)
}

window.setup = function() {
  createCanvas(400, 400)
  noLoop()
}

window.draw = function() {
  background(220)

  let FillColor = $fx.getParam("Color_id").hex.rgb
  let FreamOn   = $fx.getParam("FreamOn_id")
  let Count     = $fx.getParam("Count_id")
  let Shape     = $fx.getParam("Shape_id")
  let Odds      = $fx.getParam("SquareOdds_id")
  let Sign      = $fx.getParam("Sign_id")
  push()
    fill(FillColor)
    if (FreamOn) {
      strokeWeight(2)
      stroke(0)
    }
    else
    {
      noStroke()
    }

    for (let i = 0; i < Count; i++) {
      if (Shape == "circle") {
        circle(fxrand()*width, fxrand()*height, 20+fxrand()*50)
      }
      else if (Shape == "square") {
        square(fxrand()*width, fxrand()*height, 20+fxrand()*50)
      }
      else {
        if (fxrand() > Odds) {
          circle(fxrand()*width, fxrand()*height, 20+fxrand()*50)
        } else {
          square(fxrand()*width, fxrand()*height, 20+fxrand()*50)
        }
      }
    }
   
  pop()

  text(Sign, 0, 0, 100, 50)

}