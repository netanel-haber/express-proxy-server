# express-server-orchestrator
A simple POC (no error management etc.) microservice orchestrator - an express server that serves as a proxy to other express servers on the same machine, 
assigning and managing ports as needed.
Effectively acting as an orchestrator and a single gateway on a host to numerous machines.
Can also act as a load balancer with necessary changes. 
Makes use of get-port and express-http-proxy.
