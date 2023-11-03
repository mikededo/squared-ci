export type Container = {
  image: string;
  credentials: { name: string; password: string };
  env: Set<string>;
  ports: Set<string>;
  volumes: Set<string>;
  options: Set<string>;
};
