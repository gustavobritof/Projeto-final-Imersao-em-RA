import { MindARThree } from "https://cdn.jsdelivr.net/npm/mind-ar@1.3.2/dist/mindar-image-three.prod.js";

document.addEventListener("DOMContentLoaded", async () => {

  const mindarThree = new MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./assets/tabuleiro.mind",
  });

  const { renderer, scene, camera } = mindarThree;

  // cria âncora (ponto onde o modelo fica ANEXADO ao tabuleiro)
  const anchor = mindarThree.addAnchor(0);

  // objeto básico de teste
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);

  anchor.group.add(cube);

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    cube.rotation.y += 0.01;
  });
});
