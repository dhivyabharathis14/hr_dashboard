FROM node:18

WORKDIR /hr-dashboard

COPY package*.json ./
RUN npm install

COPY . .

# OPTIONAL: Add global or dev dependencies if not listed in package.json
# RUN npm install -D vitest @vitest/globals tailwindcss postcss autoprefixer

# Set correct tsconfig for Vite compatibility
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
