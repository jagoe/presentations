### Jakob Göbel

# Introduction to Kubernetes

---

## What is k8s?

> Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.

----

## Open-source

* Flagship of the CNCF
* Evolved from Borg by Google
* Maintained by the community
* Huge ecosystem

----

## Automating deployment, scaling, and management

* provides an abstraction of infrastructure to run applications on
* separates infrastructure into resources for e.g. networking, computing, load-balacing, and so on
* can be configured by applying yaml manifests

----

## Containerized applications

* usually dockerized applications or services
* can work with other container runtimes, such as rkt

---

## The basics

Note:

* basic k8s resources needed to run an application on k8s
* won't go into when and when not to use k8s, can be easily found in their documentation

----

## Node

A physical or virtual machine capable of doing work.

----

## Cluster

> A set of Nodes that run containerized applications managed by Kubernetes.

Note:

* hard boundary within which communcation within your k8s instance can be seen as internal

----

## Pod

> [...] a single instance of an application in Kubernetes [...] either a single container or a small number of containers

Note:

* most often this wraps the docker container
* provides an IP, resources, running and restart mechanisms, and other settings

----

## Deployment

* wraps state for a set of one or multiple pods
* updating the deployment rolls out updates for the pods
* wraps replica sets, which are actually used for scaling workers horizontally

----

## Service

* network wrapper for a set of one or multiple pods
* single DNS name
* automatic load-balancing
* does not expose to the Internet

Note:

* can be used for A-B testing
* can also be used to introduce and test real-life impact of the application in a new language

----

## Ingress

> An API object that manages external access to the services in a cluster, typically HTTP.

---

## Run k8s locally

* Docker Desktop
* Minikube
* kind
* kubeadm
* microk8s
* k3s
* actual VMs or physical machines (such as Raspberry Pis)

Note:

* in my experience Minikube is most reliable regarding k8s features and cross-platform support, but can be a hassle to setup
* kind on the other hand is easy to setup, but lacks some rudimentary features for a full k8s experience, such as support for Ingress and storage

---

## Demo

---

## Sources & References

* <https://kubernetes.io>
* <https://kubernetes.io/docs/concepts/overview/components/>
* <https://coreos.com/rkt/>
* <https://kubernetes.io/docs/tasks/tools/install-minikube/>
