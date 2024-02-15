namespace SpriteKind {
    export const flower = SpriteKind.create()
    export const hi = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.melt)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.melt)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    scene.cameraFollowSprite(slime)
    if (info.score() >= 50) {
        mySprite.setPosition(1, 1)
        sprites.destroy(bee)
        sprites.destroy(flower)
        sprites.destroy(mySprite)
        scene.cameraFollowSprite(slime)
        tiles.setCurrentTilemap(tilemap`level7`)
        for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
            mySprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . f f f f f f f . . . . . . 
                . . f 5 5 5 5 5 5 5 f . . . . . 
                . f 5 5 5 5 5 5 5 5 5 f . . . . 
                f 5 5 5 5 5 5 5 5 5 5 5 f . . . 
                f 5 5 5 5 4 4 5 5 5 5 5 f . . . 
                f 5 5 5 5 4 5 5 5 5 5 5 f . . . 
                f 5 5 5 5 4 5 5 5 5 5 5 f . . . 
                f 5 5 5 5 4 4 5 5 5 5 5 f . . . 
                f 5 5 5 5 5 5 5 5 5 5 5 f . . . 
                f 5 5 5 5 5 5 5 5 5 5 5 f . . . 
                . f 5 5 5 5 5 5 5 5 5 f . . . . 
                . . f 5 5 5 5 5 5 5 f . . . . . 
                . . . f f f f f f f . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Food)
            tiles.placeOnTile(mySprite, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
        for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
            flower = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 4 4 . . . . . 
                . . . . . 4 5 5 5 5 5 4 . . . . 
                . . . . . 4 5 5 5 5 5 4 . . . . 
                . . . . . 4 5 5 5 5 5 4 . . . . 
                . . . . . 4 5 5 5 5 5 4 . . . . 
                . 7 7 7 7 4 5 5 5 5 5 4 . . . . 
                . . 7 7 7 7 4 4 4 4 4 . 7 . . . 
                . . . 7 7 . 7 7 7 . . 7 7 . . . 
                . . . 7 . 7 7 7 7 7 7 7 . . . . 
                . . . 7 . . 7 7 7 7 . . . . . . 
                . . . . . . 7 7 7 7 . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                . . . . . . . 7 7 . . . . . . . 
                `, SpriteKind.flower)
            tiles.placeOnTile(flower, value)
            tiles.setTileAt(value, assets.tile`transparency16`)
        }
    }
})
sprites.onOverlap(SpriteKind.hi, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(5)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (slime.vy == 0) {
        slime.vy += -180
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.flower, function (sprite, otherSprite) {
    bee = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . . 1 1 1 . . . . . . . 
        . . . . . f 5 1 5 f f . . . . . 
        . . . . 5 f 5 f 5 f 5 . . . . . 
        . . . . 5 f 5 f 5 f 5 . . . . . 
        . . . . 5 f 5 f 5 f 5 . . . . . 
        . . . . . f 5 f 5 f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    sprites.destroy(otherSprite)
    bee.setPosition(slime.x + -80, slime.y - 80)
    bee.follow(slime)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    if (info.score() == 150) {
        game.gameOver(true)
        game.setGameOverEffect(true, effects.confetti)
    } else {
        game.showLongText("score not high enough", DialogLayout.Bottom)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (slime.y > bee.y) {
        info.changeLifeBy(-1)
        sprites.destroy(otherSprite)
    } else {
        info.changeScoreBy(5)
        sprites.destroy(otherSprite)
    }
    if (info.score() >= 15) {
        mySprite2 = sprites.create(img`
            ............fffffffff.........
            ..........ff.........ff.......
            .........f.............f......
            ........f...............f.....
            .......f.................f....
            ......f...................f...
            ......f...................f...
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            .....f.....................f..
            ......f...................f...
            ......f...................f...
            .......f.................f....
            ........f...............f.....
            .........f.............f......
            ..........ff.........ff.......
            ............fffffffff.........
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            ..............................
            `, SpriteKind.hi)
        mySprite2.setPosition(slime.x + -1, slime.y - 1)
        mySprite2.follow(slime)
    }
})
let mySprite2: Sprite = null
let bee: Sprite = null
let flower: Sprite = null
let mySprite: Sprite = null
let slime: Sprite = null
scene.setBackgroundColor(9)
slime = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . a 7 7 7 7 7 7 7 7 a . . . 
    . . a 7 7 7 7 7 7 7 7 7 7 a . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . 7 7 f f 7 7 7 7 f f 7 7 . . 
    . . 7 7 f 7 7 7 7 7 7 f 7 7 . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
    . . 1 7 7 7 7 7 7 7 7 7 7 1 . . 
    . . 1 7 7 7 7 7 7 7 7 7 7 1 . . 
    . . 7 1 7 7 7 7 7 7 7 7 1 7 . . 
    . . 7 7 1 1 1 1 1 1 1 1 7 7 . . 
    . . c 7 7 7 7 7 7 7 7 7 7 c . . 
    . . . c c c c c c c c c c . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(slime, 100, 0)
slime.ay = 500
scene.cameraFollowSprite(slime)
tiles.setCurrentTilemap(tilemap`level1`)
for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f 5 5 5 5 5 5 5 f . . . . . 
        . f 5 5 5 5 5 5 5 5 5 f . . . . 
        f 5 5 5 5 5 5 5 5 5 5 5 f . . . 
        f 5 5 5 5 4 4 5 5 5 5 5 f . . . 
        f 5 5 5 5 4 5 5 5 5 5 5 f . . . 
        f 5 5 5 5 4 5 5 5 5 5 5 f . . . 
        f 5 5 5 5 4 4 5 5 5 5 5 f . . . 
        f 5 5 5 5 5 5 5 5 5 5 5 f . . . 
        f 5 5 5 5 5 5 5 5 5 5 5 f . . . 
        . f 5 5 5 5 5 5 5 5 5 f . . . . 
        . . f 5 5 5 5 5 5 5 f . . . . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnTile(mySprite, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
    flower = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 4 . . . . . 
        . . . . . 4 5 5 5 5 5 4 . . . . 
        . . . . . 4 5 5 5 5 5 4 . . . . 
        . . . . . 4 5 5 5 5 5 4 . . . . 
        . . . . . 4 5 5 5 5 5 4 . . . . 
        . 7 7 7 7 4 5 5 5 5 5 4 . . . . 
        . . 7 7 7 7 4 4 4 4 4 . 7 . . . 
        . . . 7 7 . 7 7 7 . . 7 7 . . . 
        . . . 7 . 7 7 7 7 7 7 7 . . . . 
        . . . 7 . . 7 7 7 7 . . . . . . 
        . . . . . . 7 7 7 7 . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        `, SpriteKind.flower)
    tiles.placeOnTile(flower, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
info.setLife(5)
