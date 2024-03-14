var viewer = null;

function fetchDirectory(path) {
    fetch(`/files?path=${path}`)
        .then(response => response.json())
        .then(data => {
            const directoryStructure = document.getElementById('directory-structure');
            directoryStructure.innerHTML = ''; // Clear previous content
            [...data.directories, ...data.files].forEach(item => {
                const div = document.createElement('div');
                div.textContent = item;
                div.onclick = () => {
                    if (data.directories.includes(item)) {
                        // If item is a directory, fetch its contents
                        fetchDirectory(`${path}/${item}`);
                    } else {
                        if (!['.obj', '.stl', '.glb', '.ply'].some(ext => item.endsWith(ext))) {
                            // If item is a file, display a simple preview
                            document.getElementById('preview').textContent = `Selected file: ${item}`;
                        } else {
                            // get the parent element of the viewer
                            let parentDiv = document.getElementById('preview');

                            // initialize the viewer with the parent element and some parameters
                            if (viewer === null) {
                                viewer = new OV.EmbeddedViewer(parentDiv, {
                                    camera: new OV.Camera(
                                        new OV.Coord3D(-1.5, 2.0, 3.0),
                                        new OV.Coord3D(0.0, 0.0, 0.0),
                                        new OV.Coord3D(0.0, 1.0, 0.0),
                                        45.0
                                    ),
                                    backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
                                    defaultColor: new OV.RGBColor(200, 200, 200),
                                    edgeSettings: new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1),
                                    environmentSettings: new OV.EnvironmentSettings(
                                        [
                                            '/static/o3dv/envmaps/fishermans_bastion/posx.jpg',
                                            '/static/o3dv/envmaps/fishermans_bastion/negx.jpg',
                                            '/static/o3dv/envmaps/fishermans_bastion/posy.jpg',
                                            '/static/o3dv/envmaps/fishermans_bastion/negy.jpg',
                                            '/static/o3dv/envmaps/fishermans_bastion/posz.jpg',
                                            '/static/o3dv/envmaps/fishermans_bastion/negz.jpg'
                                        ],
                                        true
                                    )
                                });
                            }

                            // load a model providing model urls
                            viewer.LoadModelFromUrlList([
                                `/file/${path}/${item}`
                            ]);
                        }
                    }
                };
                directoryStructure.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching directory:', error));
}

fetchDirectory("."); // Fetch root directory on initial load
