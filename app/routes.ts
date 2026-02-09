import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home-page.tsx"),
  layout("features/wizard/components/wizard-shell.tsx", [
    ...prefix("wizard", [
      route("layout", "features/wizard/pages/layout-step-page.tsx"),
      route("primitives", "features/wizard/pages/primitives-step-page.tsx"),
      route("components", "features/wizard/pages/components-step-page.tsx"),
      route("output", "features/wizard/pages/output-step-page.tsx"),
    ]),
  ]),
  route("*", "routes/not-found-page.tsx"),
] satisfies RouteConfig;
