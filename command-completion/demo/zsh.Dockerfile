FROM ubuntu

# install zsh
RUN  apt-get update \
  && apt-get install -y zsh \
  && rm -rf /var/lib/apt/lists/*

# source examples
RUN sh -c "printf '\nautoload -U +X compinit && compinit\nsource /zsh-examples\n' >> /root/.zshrc"
# copy examples
COPY ["./zsh-examples", "/zsh-examples"]

ENTRYPOINT zsh
