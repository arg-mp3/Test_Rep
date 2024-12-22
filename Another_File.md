from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from knowledge_graph.graph import KnowledgeGraph

app = FastAPI()

# Initialize the Knowledge Graph
graph = KnowledgeGraph()

# Data Models
class Node(BaseModel):
    id: str
    data: dict

class Edge(BaseModel):
    source: str
    target: str

class Query(BaseModel):
    question: str

# API Endpoints
@app.post("/node/")
async def add_node(node: Node):
    try:
        graph.add_node(node.id, node.data)
        return {"message": f"Node '{node.id}' added successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/edge/")
async def add_edge(edge: Edge):
    try:
        graph.add_edge(edge.source, edge.target)
        return {"message": f"Edge from '{edge.source}' to '{edge.target}' added successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/node/{node_id}/")
async def get_node(node_id: str):
    node = graph.get_node(node_id)
    if not node:
        raise HTTPException(status_code=404, detail="Node not found")
    return node

@app.post("/query/")
async def query_graph(query: Query):
    try:
        result = graph.query(query.question)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


knowledge_graph/graph.py   :

class KnowledgeGraph:
    def __init__(self):
        self.graph = {}

    def add_node(self, node_id, data):
        if node_id in self.graph:
            raise Exception(f"Node '{node_id}' already exists.")
        self.graph[node_id] = {"data": data, "edges": []}

    def add_edge(self, source, target):
        if source not in self.graph or target not in self.graph:
            raise Exception("Both nodes must exist before adding an edge.")
        self.graph[source]["edges"].append(target)

    def get_node(self, node_id):
        return self.graph.get(node_id, None)

    def query(self, question):
        # Basic query handling
        if question.startswith("GET_NODE:"):
            node_id = question.split(":")[1].strip()
            return self.get_node(node_id)
        return {"error": "Query not understood"}


backend/requirements.txt. :

fastapi
uvicorn
