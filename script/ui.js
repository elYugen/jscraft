import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export function createUI(world) {
    const gui = new GUI()

    // Options disponibles sur le menu

    // Options pour la taille du monde
    gui.add(world.size, 'width', 8, 128, 1).name('Largeur')
    gui.add(world.size, 'height', 8, 64, 1).name('Hauteur')
    
    const terrainFolder = gui.addFolder('Terrain')
    terrainFolder.add(world.params, 'seed', 0, 10000).name('seed');
    terrainFolder.add(world.params.terrain, 'scale', 10, 100).name('scale');
    terrainFolder.add(world.params.terrain, 'magnitude', 0, 100).name('magnitude');
    terrainFolder.add(world.params.terrain, 'offset', 0, 1).name('offset');

    // Met a jour automatiquement à chaque changement
    gui.onChange(() => {
        world.generate()
    })
}