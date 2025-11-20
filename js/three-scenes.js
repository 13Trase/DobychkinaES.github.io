// // 3D сцены с использованием Three.js
// document.addEventListener('DOMContentLoaded', function() {
//     // Сцена 1: Глобус (главная страница)
//     function initGlobeScene(containerId) {
//         const container = document.getElementById(containerId);
//         if (!container) return;
        
//         const width = container.clientWidth;
//         const height = container.clientHeight;
        
//         // Создание сцены, камеры и рендерера
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(width, height);
//         container.appendChild(renderer.domElement);
        
//         // Добавление света
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//         scene.add(ambientLight);
        
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//         directionalLight.position.set(5, 10, 7);
//         scene.add(directionalLight);
        
//         // Создание глобуса
//         const globeGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        
//         // Создание текстуры для глобуса (можно заменить на реальную текстуру Земли)
//         const globeMaterial = new THREE.MeshPhongMaterial({ 
//             color: 0x4a90e2,
//             shininess: 100,
//             transparent: true,
//             opacity: 0.9
//         });
        
//         const globe = new THREE.Mesh(globeGeometry, globeMaterial);
//         scene.add(globe);
        
//         // Добавление облаков
//         const cloudGeometry = new THREE.SphereGeometry(1.55, 32, 32);
//         const cloudMaterial = new THREE.MeshPhongMaterial({
//             color: 0xffffff,
//             transparent: true,
//             opacity: 0.3
//         });
//         const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
//         scene.add(clouds);
        
//         camera.position.z = 4;
        
//         // Добавление OrbitControls
//         const controls = new THREE.OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.05;
//         controls.autoRotate = true;
//         controls.autoRotateSpeed = 0.5;
        
//         // Анимация
//         function animate() {
//             requestAnimationFrame(animate);
            
//             // Медленное вращение облаков
//             clouds.rotation.y += 0.001;
            
//             controls.update();
//             renderer.render(scene, camera);
//         }
        
//         animate();
        
//         // Обработка изменения размера окна
//         window.addEventListener('resize', function() {
//             camera.aspect = container.clientWidth / container.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(container.clientWidth, container.clientHeight);
//         });
//     }
    
//     // Сцена 2: Книга (страница "Обо мне")
//     function initBookScene(containerId) {
//         const container = document.getElementById(containerId);
//         if (!container) return;
        
//         const width = container.clientWidth;
//         const height = container.clientHeight;
        
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(width, height);
//         container.appendChild(renderer.domElement);
        
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//         scene.add(ambientLight);
        
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//         directionalLight.position.set(1, 1, 1);
//         scene.add(directionalLight);
        
//         // Создание книги
//         const bookGeometry = new THREE.BoxGeometry(2, 3, 0.5);
//         const bookMaterial = new THREE.MeshPhongMaterial({ 
//             color: 0xff7e5f,
//             shininess: 30
//         });
//         const book = new THREE.Mesh(bookGeometry, bookMaterial);
//         scene.add(book);
        
//         // Добавление страниц
//         const pagesGeometry = new THREE.BoxGeometry(1.9, 2.9, 0.6);
//         const pagesMaterial = new THREE.MeshPhongMaterial({ 
//             color: 0xffffff,
//             shininess: 10
//         });
//         const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
//         scene.add(pages);
        
//         camera.position.z = 5;
        
//         const controls = new THREE.OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.05;
//         controls.autoRotate = true;
//         controls.autoRotateSpeed = 0.8;
        
//         function animate() {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//         }
        
//         animate();
        
//         window.addEventListener('resize', function() {
//             camera.aspect = container.clientWidth / container.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(container.clientWidth, container.clientHeight);
//         });
//     }
    
//     // Сцена 3: Карандаш (методическая копилка)
//     function initPencilScene(containerId) {
//         const container = document.getElementById(containerId);
//         if (!container) return;
        
//         const width = container.clientWidth;
//         const height = container.clientHeight;
        
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(width, height);
//         container.appendChild(renderer.domElement);
        
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//         scene.add(ambientLight);
        
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//         directionalLight.position.set(1, 1, 1);
//         scene.add(directionalLight);
        
//         // Создание карандаша
//         const pencilBodyGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
//         const pencilBodyMaterial = new THREE.MeshPhongMaterial({ 
//             color: 0xfeb47b,
//             shininess: 50
//         });
//         const pencilBody = new THREE.Mesh(pencilBodyGeometry, pencilBodyMaterial);
//         scene.add(pencilBody);
        
//         // Грифель
//         const leadGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 32);
//         const leadMaterial = new THREE.MeshPhongMaterial({ 
//             color: 0x333333,
//             shininess: 100
//         });
//         const lead = new THREE.Mesh(leadGeometry, leadMaterial);
//         lead.position.y = -1.15;
//         scene.add(lead);
        
//         // Ластик
//         const eraserGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32);
//         const eraserMaterial = new THREE.MeshPhongMaterial({ 
//             color: 0xff6b6b,
//             shininess: 30
//         });
//         const eraser = new THREE.Mesh(eraserGeometry, eraserMaterial);
//         eraser.position.y = 1.15;
//         scene.add(eraser);
        
//         camera.position.z = 4;
        
//         const controls = new THREE.OrbitControls(camera, renderer.domElement);
//         controls.enableDamping = true;
//         controls.dampingFactor = 0.05;
//         controls.autoRotate = true;
//         controls.autoRotateSpeed = 1;
        
//         function animate() {
//             requestAnimationFrame(animate);
//             controls.update();
//             renderer.render(scene, camera);
//         }
        
//         animate();
        
//         window.addEventListener('resize', function() {
//             camera.aspect = container.clientWidth / container.clientHeight;
//             camera.updateProjectionMatrix();
//             renderer.setSize(container.clientWidth, container.clientHeight);
//         });
//     }
    
//     // Инициализация всех сцен
//     initGlobeScene('threeContainer1');    // Глобус на главной
//     initBookScene('threeContainer2');     // Книга на "Обо мне"
//     initPencilScene('threeContainer3');   // Карандаш на методической копилке
//     initBookScene('threeContainer4');     // Книга на ресурсах

// });
