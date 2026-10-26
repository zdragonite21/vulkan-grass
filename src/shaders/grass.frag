#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
} camera;

layout(location = 0) in vec2 fragUV;

layout(location = 0) out vec4 outColor;

const vec3 COLOR = vec3(0, 1, 0);

void main() {
    outColor = vec4(fragUV.xy, 0, 1.0);
}
