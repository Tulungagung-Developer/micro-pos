import { defineConfig, loadEnv } from "vite";
import UnoCSS from "unocss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		server: {
			port: Number(env.VITE_PORT),
		},
		plugins: [react(), UnoCSS(), tsconfigPaths()],
		resolve: {
			alias: [{ find: /^~/, replacement: "" }],
		},
		css: {
			modules: {
				generateScopedName: "micropos-[local]-[hash:base64:5]",
				localsConvention: "camelCaseOnly",
			},
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					additionalData: `@import "src/styles/vars.less";`,
				},
			},
		},
	};
});
