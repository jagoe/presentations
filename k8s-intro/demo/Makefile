kind:
	# create kind cluster
	kind create cluster
	# set correct config
	kubectl config use-context kubernetes-admin@kind
	# apply our resources
	kubectl apply -f ./manifests
	# expose port (sadly, kind doesn't yet do ingress without a hassle)
	kubectl port-forward service/k8s-intro-demo 8000:80
	# aaaaaaand open!
	xdg-open http://localhost:8000

minikube:
	# set correct config
	kubectl config use-context minikube
	# apply our resources
	kubectl apply -f ./manifests
	# aaaaaaand open!
	xdg-open http://$(shell minikube ip)/demo
