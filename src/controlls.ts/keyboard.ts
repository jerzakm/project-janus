export const playerData = {
  moving: {
    x: 0,
    y: 0
  }
}

export const initControlls = () => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.code) {
      case 'KeyD': {
        playerData.moving.x = 1
        break
      }
      case 'KeyA': {
        playerData.moving.x = -1
        break
      }
      case 'KeyW': {
        playerData.moving.y = -1
        break
      }
      case 'KeyS': {
        playerData.moving.y = 1
        break
      }
    }
  })

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    e.preventDefault()
    switch (e.code) {
      case 'KeyD': {
        playerData.moving.x = 0
        break
      }
      case 'KeyA': {
        playerData.moving.x = 0
        break
      }
      case 'KeyW': {
        playerData.moving.y = 0
        break
      }
      case 'KeyS': {
        playerData.moving.y = 0
        break
      }
    }
  })
}