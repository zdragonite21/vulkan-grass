#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(set = 0, binding = 0) uniform CameraBufferObject {
    mat4 view;
    mat4 proj;
}
camera;

layout(location = 0) in vec2 fragUV;

layout(location = 0) out vec4 outColor;

#define RAMP_COUNT 4

vec3 color_ramp(vec4 ramp[RAMP_COUNT], float t) {
    int i = 0;
    while (i < RAMP_COUNT && ramp[i].w < t) {
        i++;
    }
    int l = max(i - 1, 0);
    int r = min(i, RAMP_COUNT - 1);
    return l == r ? ramp[l].xyz : mix(ramp[l].xyz, ramp[r].xyz, (t - ramp[l].w) / (ramp[r].w - ramp[l].w));
}

void main() {
    vec4 stops[RAMP_COUNT] = vec4[RAMP_COUNT](vec4(0.2, 0.2, 0.2, 0.1), vec4(0.2, 0.4, 1.0, 0.2),
                                              vec4(1.0, 0.8, 0.2, 0.5), vec4(1.0, 1.0, 1.0, 0.8));

    vec3 c = color_ramp(stops, fragUV.y);
    outColor = vec4(c, 1.0);
}
