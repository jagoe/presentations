FROM ubuntu

# source examples
RUN sh -c "printf '\nsource /bash-examples\n' >> /root/.bashrc"
# copy examples
COPY ["./bash-examples", "/bash-examples"]
