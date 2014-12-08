seattle-crime-visualization
===========================

An application to help Seattle residents understand crime around CenturyLink field

### How to run:

For all directions, please use a Linux or Apple OS X computer.

1. Clone the repository.

```
git clone https://github.com/fma2/seattle-crime-visualization.git
```

2. Bundle to install gems

```
bundle install
```

3. Run rake commands to create and migrate database

```
rake db:create db:migrate
```

4. Run the Rails server

```
rails s
```

5. Open [http://localhost:3000/](http://localhost:3000/) in your browser
