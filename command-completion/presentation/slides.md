### Jakob Göbel

# Introduction to `bash`/`zsh` completion

Notes: FYI: I won't go into shells I have not used, like `fish`

---

## What is command completion?

Notes: Show examples; kubectl, vpn, code, ctx

---

## How can I get some?

----

### Some CLIs provide

* `kubectl completion (bash/zsh/...)`
* [One for docker-compose](https://raw.githubusercontent.com/docker/compose/1.25.5/contrib/completion/bash/docker-compose)

----

### oh-my-zsh

Comes with loads of plugins for all your favorite tools\
(zsh only, obviously)

----

### Community

There are a boatload of ready-made completions already out there:

* [bash](https://github.com/scop/bash-completion)
* [zsh](https://github.com/zsh-users/zsh-completions)

---

## But I can't find any for [X]!

Writing completions is not that hard (for the most part).

---

### Setup

----

#### `bash`

No setup necessary, just source the completion scripts

----

#### `zsh`

Completion needs to be enabled first\
(already the case if you're using `oh-my-zsh`):

```zsh
autoload -U +X compinit && compinit
```

`zsh` can also handle `bash` completions:
```zsh
autoload -U +X bashcompinit && bashcompinit
```

---

### A simple list of arguments

----

#### `bash`

```bash
complete -W "arg1 arg2 arg3" cmd
```

----

#### `zsh`

```zsh
_cmd() {
  local args=(arg1 arg2 arg3)

  _describe 'cmd' args
}

compdef _cmd cmd
```

---

### Multiple layers

----

#### `bash`

```bash
_layers() {
  local prev cur opts
  COMPREPLY=()
  cur=${COMP_WORDS[COMP_CWORD]}
  prev=${COMP_WORDS[COMP_CWORD - 1]}

  # layer 0 - print the first layer of arguments
  if [ $COMP_CWORD -eq 1 ]; then
    opts="a b"
  # layer 1 - print the correct arguments for each previous argument
  elif [ $COMP_CWORD -eq 2 ]; then
    case $prev in
    a)
      opts="a1 a2 a3"
      ;;
    b)
      opts="b1 b2"
      ;;
    esac
  fi

  COMPREPLY=($(compgen -W "$opts" -- $cur))
}

complete -F _layers layer
```

----

#### `zsh`

```zsh
_layer() {
  local prev args

  _arguments \
    '1: :->level1' \
    '2: :->level2'

  case $state in
  level1)
    args=(a b)
    ;;
  level2)
    prev=${words[2]}
    case $prev in
    a)
      args=(a1 a2 a3)
      ;;
    b)
      args=(b1 b2)
      ;;
    esac
    ;;
  esac

  if [ ${#args} -gt 0 ]; then
    _describe 'layer' args
  fi
}

compdef _layer layer
```

---

### Input mapping

----

#### `bash`

Not supported*, though prefixes and suffixes are possible

<sub style="font-size: .2em">* to my knowledge and within the available time</sub>

----

#### `zsh`

```zsh
_map() {
  display=(a b c)
  values=(long/path/to/a long/path/to/b long/path/to/c)

  _describe 'map' display values
}

compdef _map map
```

---

## Some links

----

### Shells/Frameworks

* [bash](https://www.gnu.org/software/bash/) — No explanation needed
* [zsh](https://www.zsh.org/) — One of many `bash` alternatives, mostly for interactive use
* [oh-my-zsh](https://ohmyz.sh/) — `zsh` configuration framework ("Oh My Zsh will not make you a 10x developer...but you may feel like one.")

----

### Ready-made completions

* [The bash-completion project](https://github.com/scop/bash-completion) — Lots of existing completions for `bash`
* [The zsh-completions project](https://github.com/zsh-users/zsh-completions) — Lots of existing completions for `zsh`

----

### DIY

* [`bash` Programmable Completion Builtins](https://www.gnu.org/software/bash/manual/html_node/Programmable-Completion-Builtins.html) with [example](https://www.gnu.org/software/bash/manual/html_node/A-Programmable-Completion-Example.html) — A fun read
* [`zsh` Completion System](http://zsh.sourceforge.net/Doc/Release/Completion-System.html#Completion-System) — More fun!
* [A `zsh` Completion Introduction](https://mads-hartmann.com/2017/08/06/writing-zsh-completion-scripts.html) — Actually readable
